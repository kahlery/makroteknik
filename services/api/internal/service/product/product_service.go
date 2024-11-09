package product

import (
	"api/internal/service/product/dto"
	"api/internal/service/product/model"
	"api/internal/service/product/repo"

	// pkg services:
	"api/pkg/service/aws"

	// project utils:
	"api/pkg/util"

	// encoding:
	"encoding/base64"

	// built-in utils
	"strings"

	// fiber:
	"github.com/gofiber/fiber/v2"

	// mongo:
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ProductRepo is the repository for product service
type ProductService struct {
	productRepo *repo.ProductRepo
	imagePath   *string
	s3Service   *aws.S3Service
}

func NewProductService(productRepo *repo.ProductRepo, s3Service *aws.S3Service, imagePath *string) *ProductService {
	return &ProductService{
		imagePath:   imagePath,
		productRepo: productRepo,
		s3Service:   s3Service,
	}
}

// functions: --------------------------------------------------------------------

// GetProduct fetches products from MongoDB, then fetches their images from S3
func (p *ProductService) GetProducts(c *fiber.Ctx) error {
	// 1. Fetch products from MongoDB
	products, err := p.productRepo.GetProducts(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("failed to fetch products from MongoDB: " + err.Error())
	}

	// 2. Fetch images from ../../assets/images/products
	// read all images stored in the same directory, named as their _id.webp
	failedImageIds := []string{}
	productResponses := []dto.Product{}
	for _, product := range products {
		imageName := product.ID.Hex() + ".webp"
		imageData, err := p.s3Service.GetFile(p.imagePath, &imageName)
		if err != nil {
			// util.LogError("failed to read from directory to buffer: " + err.Error())
			failedImageIds = append(failedImageIds, product.ID.Hex())
			continue
		}

		imageDataBase64 := base64.StdEncoding.EncodeToString(imageData)
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

	// util.LogError("failed to read from directory to buffer on these files: " + strings.Join(failedImageIds, "-"))

	// 4. Return the response
	return c.Status(fiber.StatusOK).JSON(dto.GetProductsResponse{
		Products: productResponses,
	})
}

// --------------------------------------------------------------------

func (p *ProductService) PostProduct(ctx *fiber.Ctx) error {
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

	imageName := mappedProduct.ID.Hex() + ".webp"
	if err := p.s3Service.PostFile(p.imagePath, &imageName, imageData); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to save image to directory: " + err.Error())
	}

	// 4. Add the product to MongoDB
	if err := p.productRepo.AddProduct(ctx.Context(), mappedProduct); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to add product to MongoDB: " + err.Error())
	}

	return ctx.Status(fiber.StatusOK).SendString("product added successfully")
}

// --------------------------------------------------------------------

func (p *ProductService) PatchProduct(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	util.LogWarn("Product ID will be updated: " + id)

	// 1. Marshall the product from the response body
	var product dto.Product
	if err := ctx.BodyParser(&product); err != nil {
		return ctx.Status(fiber.StatusBadRequest).SendString("failed to parse request body: " + err.Error())
	}

	// 2. Find which fields are updated, otherwise keep the old values and map the product to the model
	foundedProduct, err := p.productRepo.GetProduct(ctx.Context(), id)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to fetch product from MongoDB: " + err.Error())
	}

	if product.CategoryId == "" {
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

		imageName := mappedProduct.ID.Hex() + ".webp"
		if err := p.s3Service.PostFile(p.imagePath, &imageName, imageData); err != nil {
			return ctx.Status(fiber.StatusInternalServerError).SendString("failed to save image to directory: " + err.Error())
		}
	}

	// 4. Update the product in MongoDB
	if err := p.productRepo.UpdateProduct(ctx.Context(), mappedProduct, id); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to update product in MongoDB: " + err.Error())
	}

	return ctx.Status(fiber.StatusOK).SendString("product updated successfully")
}

// --------------------------------------------------------------------

func (p *ProductService) DeleteProduct(ctx *fiber.Ctx) error {
	// 1. Get the product ID from the request parameters
	id := ctx.Params("id")

	// 2. Delete the image from ../../assets/images/products
	if err := p.s3Service.DeleteFile(*p.imagePath, id+".webp"); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to delete image from directory: " + err.Error())
	}

	util.LogSuccess("S3: image deleted from directory: " + id + ".webp")

	// 3. Delete the product from MongoDB
	if err := p.productRepo.DeleteProduct(ctx.Context(), id); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to delete product from MongoDB: " + err.Error())
	}

	return ctx.Status(fiber.StatusOK).SendString("product deleted successfully")
}
