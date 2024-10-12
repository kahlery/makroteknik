// server/api/src/internal/service/product/product_service.go

package product

import (
	"api/src/internal/service/product/dto"
	"api/src/internal/service/product/model"
	"api/src/internal/service/product/repo"
	"api/src/pkg/util"
	"encoding/base64"
	"encoding/json"
	"strings"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// productRepo is the repository for product service
var productRepo *repo.ProductRepo

// InitProductService function initializes the product service
//   - Parameters: client *mongo.Client: instance of mongo.Client
func InitProductService(client *mongo.Client) {
	productRepo = repo.NewProductRepo(client)
}

// GetProduct fetches products from MongoDB, then fetches their images from S3
func GetProducts(c *fiber.Ctx) error {
	// 1. Fetch products from MongoDB
	products, err := productRepo.GetProducts(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("failed to fetch products from MongoDB: " + err.Error())
	}

	last := products[len(products)-1]
	jsonizedLast, _ := json.MarshalIndent(last, " ", " ")
	util.LogDebug(string(jsonizedLast))
	util.LogDebug("last element's ID: " + last.ID.Hex())

	// 2. Fetch images from ../../assets/images/products
	// All images are stored in the same directory, named as their _id.webp
	// We will read the image data and convert it to base64
	failedImageIds := []string{}
	productResponses := []dto.Product{}
	for _, product := range products {
		// Read the image data
		imageData, err := util.BufferSingleImageFromDirectory("../../../../assets/images/products", product.ID.Hex()+".webp")
		if err != nil {
			failedImageIds = append(failedImageIds, product.ID.Hex())
			continue
		}

		// Convert the image data to base64
		imageDataBase64 := base64.StdEncoding.EncodeToString(imageData)

		// Add data:image/webp;base64, prefix to the base64 image data
		imageDataBase64 = "data:image/webp;base64," + imageDataBase64

		// 3. Prepare the product response with base64 image data
		productResponse := dto.Product{
			ID:          product.ID.Hex(),
			CategoryId:  product.CategoryId,
			Title:       product.Title,
			ProductCode: product.ProductCode,
			Description: product.Description,
			SizeToPrice: product.SizeToPrice,
			Image:       imageDataBase64,
		}

		productResponses = append(productResponses, productResponse)
	}

	util.LogError("failed to read from directory to buffer on these files: \n" + strings.Join(failedImageIds, ", "))

	// 4. Return the response
	return c.Status(fiber.StatusOK).JSON(dto.GetProductsResponse{
		Products: productResponses,
	})
}

func PostProduct(ctx *fiber.Ctx) error {
	// 1. Marshall the product from the response body
	var product dto.Product
	if err := ctx.BodyParser(&product); err != nil {
		return ctx.Status(fiber.StatusBadRequest).SendString("failed to parse request body: " + err.Error())
	}

	util.LogSuccess("Product received: " + product.Title)

	// 2. Map the product to the model
	mappedProduct := model.Product{
		ID:          primitive.NewObjectID(),
		CategoryId:  product.CategoryId,
		Title:       product.Title,
		ProductCode: product.ProductCode,
		Description: product.Description,
		SizeToPrice: product.SizeToPrice,
	}

	// 3. Save the image to ../../assets/images/products with the _id.webp name
	imageData, err := base64.StdEncoding.DecodeString(strings.Split(product.Image, "base64,")[1])
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to decode base64 image: " + err.Error())
	}

	if err := util.SaveImageToDirectory("../../../../assets/images/products", mappedProduct.ID.Hex()+".webp", imageData); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to save image to directory: " + err.Error())
	}

	// 4. Add the product to MongoDB
	if err := productRepo.AddProduct(ctx.Context(), mappedProduct); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to add product to MongoDB: " + err.Error())
	}

	return ctx.Status(fiber.StatusOK).SendString("product added successfully")
}

func PatchProduct(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	util.LogWarn("Product ID will be updated: " + id)

	// 1. Marshall the product from the response body
	var product dto.Product
	if err := ctx.BodyParser(&product); err != nil {
		return ctx.Status(fiber.StatusBadRequest).SendString("failed to parse request body: " + err.Error())
	}

	// 2. Find which fields are updated, otherwise keep the old values and map the product to the model
	foundedProduct, err := productRepo.GetProduct(ctx.Context(), id)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to fetch product from MongoDB: " + err.Error())
	}

	if product.CategoryId == 0 {
		product.CategoryId = foundedProduct.CategoryId
	}
	if product.Title == "" {
		product.Title = foundedProduct.Title
	}
	if product.ProductCode == "" {
		product.ProductCode = foundedProduct.ProductCode
	}
	if product.Description == "" {
		product.Description = foundedProduct.Description
	}
	if len(product.SizeToPrice) == 0 {
		product.SizeToPrice = foundedProduct.SizeToPrice
	}

	mappedProduct := model.Product{
		ID:          foundedProduct.ID,
		CategoryId:  product.CategoryId,
		Title:       product.Title,
		ProductCode: product.ProductCode,
		Description: product.Description,
		SizeToPrice: product.SizeToPrice,
	}

	// 3. Save the image to ../../assets/images/products with the _id.webp name if the image is updated
	if product.Image != "" {
		imageData, err := base64.StdEncoding.DecodeString(strings.Split(product.Image, "base64,")[1])
		if err != nil {
			return ctx.Status(fiber.StatusInternalServerError).SendString("failed to decode base64 image: " + err.Error())
		}

		if err := util.SaveImageToDirectory("../../../../assets/images/products", mappedProduct.ID.Hex()+".webp", imageData); err != nil {
			return ctx.Status(fiber.StatusInternalServerError).SendString("failed to save image to directory: " + err.Error())
		}
	}

	// 4. Update the product in MongoDB
	if err := productRepo.UpdateProduct(ctx.Context(), mappedProduct, id); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to update product in MongoDB: " + err.Error())
	}

	return ctx.Status(fiber.StatusOK).SendString("product updated successfully")
}

func DeleteProduct(ctx *fiber.Ctx) error {
	// 1. Get the product ID from the request parameters
	id := ctx.Params("id")

	// 2. Delete the image from ../../assets/images/products
	if err := util.DeleteImageFromDirectory("../../../../assets/images/products", id+".webp"); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to delete image from directory: " + err.Error())
	}

	util.LogDebug("Image deleted from directory: " + id + ".webp")

	// 3. Delete the product from MongoDB
	if err := productRepo.DeleteProduct(ctx.Context(), id); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to delete product from MongoDB: " + err.Error())
	}

	return ctx.Status(fiber.StatusOK).SendString("product deleted successfully")
}
