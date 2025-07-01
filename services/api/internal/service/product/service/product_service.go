package product

import (
	"api/internal/service/product/dto"
	"api/internal/service/product/repo"

	aws_service "github.com/kahlery/pkg/go/aws/service"
	"github.com/kahlery/pkg/go/log/util"

	// encoding:

	// built-in utils

	// fiber:
	"github.com/gofiber/fiber/v2"
	// mongo:
)

// ProductRepo is the repository for product service
type ProductService struct {
	productRepo *repo.ProductRepo
	imagePath   *string
	s3Service   *aws_service.S3Service
}

func NewProductService(productRepo *repo.ProductRepo, s3Service *aws_service.S3Service, imagePath *string) *ProductService {
	util.LogInfo(nil, "ProductService initialized successfully", "ProductService.NewProductService", "")
	return &ProductService{
		imagePath:   imagePath,
		productRepo: productRepo,
		s3Service:   s3Service,
	}
}

// functions: --------------------------------------------------------------------

func (p *ProductService) GetProducts(ctx *fiber.Ctx) error {
	processID := ctx.Locals("processID").(string)
	location := "ProductService.GetProducts"

	util.LogInfo(ctx.Context(), "Starting to fetch products", location, processID)

	// 1. Fetch products from MongoDB
	products, err := p.productRepo.GetProducts(ctx)
	if err != nil {
		util.LogError(ctx.Context(), "Failed to fetch products from MongoDB: "+err.Error(), location, processID)
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to fetch products from MongoDB: " + err.Error())
	}

	util.LogSuccess(ctx.Context(), "Successfully fetched products from MongoDB", location, processID)
	util.LogInfo(ctx.Context(), "Generating signed URLs from S3 for products", location, processID)

	productResponses := []dto.Product{}

	for _, product := range products {
		imageName := product.ID + ".webp"

		util.LogTask(ctx.Context(), "Generating signed URL for product: "+product.ID, location, processID)

		// Generate pre-signed URL for the image from S3
		imageUrl, err := p.s3Service.GetSignedURL(p.imagePath, &imageName, 300) // 300 seconds = 5 minutes expiry
		if err != nil {
			util.LogWarn(ctx.Context(), "Failed to generate signed URL for product "+product.ID+": "+err.Error(), location, processID)
			imageUrl = "" // Or you can set a placeholder/fallback URL
		}

		// Prepare the response including the signed URL
		productResponse := dto.Product{
			ID:          product.ID,
			Category:    product.Category,
			Title:       product.Title,
			ProductCode: product.ProductCode,
			Description: product.Description,
			SizeToPrice: product.SizeToPrice,
			ImageUrl:    imageUrl,
			ImageName:   "", // You can keep or remove this based on your DTO
		}

		productResponses = append(productResponses, productResponse)
		util.LogTask(ctx.Context(), "Successfully processed product: "+product.ID, location, processID)
	}

	util.LogSuccess(ctx.Context(), "Successfully completed product retrieval operation", location, processID)

	// Return the response
	return ctx.Status(fiber.StatusOK).JSON(dto.GetProductsResponse{
		Products: productResponses,
	})
}

// --------------------------------------------------------------------

// func (p *ProductService) PostProduct(ctx *fiber.Ctx) error {
// 	processID := ctx.Locals("processID").(string)
// 	location := "ProductService.PostProduct"

// 	util.LogInfo(ctx.Context(), "Starting product creation", location, processID)

// 	// 1. Marshall the product from the response body
// 	var product dto.Product
// 	if err := ctx.BodyParser(&product); err != nil {
// 		util.LogError(ctx.Context(), "Failed to parse request body: "+err.Error(), location, processID)
// 		return ctx.Status(fiber.StatusBadRequest).SendString("failed to parse request body: " + err.Error())
// 	}

// 	util.LogTask(ctx.Context(), "Successfully parsed product request body", location, processID)

// 	// Generate a new ID for the product
// 	generatedID := primitive.NewObjectID()
// 	util.LogTask(ctx.Context(), "Generated new product ID: "+generatedID.Hex(), location, processID)

// 	// 2. Map the product to the model
// 	mappedProduct := model.Product{
// 		ID:          generatedID.String(),
// 		Category:    product.Category,
// 		Title:       product.Title,
// 		ProductCode: product.ProductCode,
// 		Description: product.Description,
// 		SizeToPrice: product.SizeToPrice,
// 	}

// 	var imageData []byte

// 	// Handle image processing if it exists
// 	if product.Image != "" {
// 		util.LogTask(ctx.Context(), "Processing product image", location, processID)
// 		var err error
// 		// Decode the base64 image data
// 		imageData, err = base64.StdEncoding.DecodeString(strings.Split(product.Image, "base64,")[1])
// 		if err != nil {
// 			util.LogError(ctx.Context(), "Failed to decode base64 image: "+err.Error(), location, processID)
// 			return ctx.Status(fiber.StatusInternalServerError).SendString("failed to decode base64 image: " + err.Error())
// 		}
// 		util.LogTask(ctx.Context(), "Successfully decoded base64 image", location, processID)
// 	}

// 	// Image name generated based on product ID
// 	imageName := mappedProduct.ID + ".webp"

// 	// 3. Upload image to S3 with metadata containing the image name
// 	util.LogTask(ctx.Context(), "Uploading image to S3: "+imageName, location, processID)
// 	if err := p.s3Service.PostObject(p.imagePath, &imageName, imageData, product.ImageName, processID); err != nil {
// 		util.LogError(ctx.Context(), "Failed to save image to S3: "+err.Error(), location, processID)
// 		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to save image to directory: " + err.Error())
// 	}
// 	util.LogSuccess(ctx.Context(), "Successfully uploaded image to S3", location, processID)

// 	// 4. Add the product to MongoDB
// 	util.LogTask(ctx.Context(), "Adding product to MongoDB", location, processID)
// 	if err := p.productRepo.AddProduct(ctx, mappedProduct); err != nil {
// 		util.LogError(ctx.Context(), "Failed to add product to MongoDB: "+err.Error(), location, processID)
// 		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to add product to MongoDB: " + err.Error())
// 	}

// 	util.LogSuccess(ctx.Context(), "Successfully created product with ID: "+generatedID.Hex(), location, processID)

// 	// Return success with the generated product ID
// 	return ctx.Status(fiber.StatusOK).JSON(dto.PostProductResponse{
// 		ProductID: generatedID.Hex(),
// 	})
// }

// // --------------------------------------------------------------------

// func (p *ProductService) PatchProduct(ctx *fiber.Ctx) error {
// 	id := ctx.Params("id")
// 	processID := ctx.Locals("processID").(string)
// 	location := "ProductService.PatchProduct"

// 	util.LogInfo(ctx.Context(), "Starting product update for ID: "+id, location, processID)

// 	// 1. Marshall the product from the response body
// 	var product dto.Product
// 	if err := ctx.BodyParser(&product); err != nil {
// 		util.LogError(ctx.Context(), "Failed to parse request body: "+err.Error(), location, processID)
// 		return ctx.Status(fiber.StatusBadRequest).SendString("failed to parse request body: " + err.Error())
// 	}

// 	util.LogTask(ctx.Context(), "Successfully parsed update request body", location, processID)

// 	// 2. Find which fields are updated, otherwise keep the old values and map the product to the model
// 	util.LogTask(ctx.Context(), "Fetching existing product from MongoDB", location, processID)
// 	foundedProduct, err := p.productRepo.GetProduct(ctx, id)
// 	if err != nil {
// 		util.LogError(ctx.Context(), "Failed to fetch product from MongoDB: "+err.Error(), location, processID)
// 		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to fetch product from MongoDB: " + err.Error())
// 	}

// 	util.LogTask(ctx.Context(), "Successfully fetched existing product", location, processID)

// 	// Apply field updates or keep existing values
// 	if product.Category == "" {
// 		product.Category = foundedProduct.Category
// 	}
// 	if product.Title == "" {
// 		product.Title = foundedProduct.Title
// 	}
// 	if product.ProductCode == "" {
// 		product.ProductCode = foundedProduct.ProductCode
// 	}
// 	if product.Description == "" {
// 		product.Description = foundedProduct.Description
// 	}
// 	if len(product.SizeToPrice) == 0 {
// 		product.SizeToPrice = foundedProduct.SizeToPrice
// 	}

// 	mappedProduct := model.Product{
// 		ID:          foundedProduct.ID,
// 		Category:    product.Category,
// 		Title:       product.Title,
// 		ProductCode: product.ProductCode,
// 		Description: product.Description,
// 		SizeToPrice: product.SizeToPrice,
// 	}

// 	// 3. Save the image to S3 if the image is updated
// 	if product.Image != "" {
// 		util.LogTask(ctx.Context(), "Processing updated image", location, processID)
// 		imageData, err := base64.StdEncoding.DecodeString(strings.Split(product.Image, "base64,")[1])
// 		if err != nil {
// 			util.LogError(ctx.Context(), "Failed to decode base64 image: "+err.Error(), location, processID)
// 			return ctx.Status(fiber.StatusInternalServerError).SendString("failed to decode base64 image: " + err.Error())
// 		}

// 		imageName := mappedProduct.ID + ".webp"
// 		util.LogTask(ctx.Context(), "Uploading updated image to S3: "+imageName, location, processID)
// 		if err := p.s3Service.PostObject(p.imagePath, &imageName, imageData, "testing", processID); err != nil {
// 			util.LogError(ctx.Context(), "Failed to save updated image to S3: "+err.Error(), location, processID)
// 			return ctx.Status(fiber.StatusInternalServerError).SendString("failed to save image to directory: " + err.Error())
// 		}
// 		util.LogSuccess(ctx.Context(), "Successfully uploaded updated image to S3", location, processID)
// 	} else { // If the image field is empty, delete the image
// 		util.LogTask(ctx.Context(), "Deleting image from S3 as no image provided", location, processID)
// 		if err := p.s3Service.DeleteObject(*p.imagePath, product.ID+".webp", processID); err != nil {
// 			util.LogWarn(ctx.Context(), "Failed to delete image from S3: "+err.Error(), location, processID)
// 		} else {
// 			util.LogTask(ctx.Context(), "Successfully deleted image from S3", location, processID)
// 		}
// 	}

// 	// 4. Update the product in MongoDB
// 	util.LogTask(ctx.Context(), "Updating product in MongoDB", location, processID)
// 	if err := p.productRepo.UpdateProduct(ctx, mappedProduct, id); err != nil {
// 		util.LogError(ctx.Context(), "Failed to update product in MongoDB: "+err.Error(), location, processID)
// 		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to update product in MongoDB: " + err.Error())
// 	}

// 	util.LogSuccess(ctx.Context(), "Successfully updated product with ID: "+id, location, processID)

// 	return ctx.Status(fiber.StatusOK).SendString("product updated successfully")
// }

// --------------------------------------------------------------------

func (p *ProductService) DeleteProduct(ctx *fiber.Ctx) error {
	// 1. Get the product ID from the request parameters
	id := ctx.Params("id")
	processID := ctx.Locals("processID").(string)
	location := "ProductService.DeleteProduct"

	util.LogInfo(ctx.Context(), "Starting product deletion for ID: "+id, location, processID)

	// 2. Delete the image from S3
	util.LogTask(ctx.Context(), "Deleting image from S3: "+id+".webp", location, processID)
	if err := p.s3Service.DeleteObject(*p.imagePath, id+".webp", processID); err != nil {
		util.LogError(ctx.Context(), "Failed to delete image from S3: "+err.Error(), location, processID)
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to delete image from directory: " + err.Error())
	}
	util.LogSuccess(ctx.Context(), "Successfully deleted image from S3", location, processID)

	// 3. Delete the product from MongoDB
	util.LogTask(ctx.Context(), "Deleting product from MongoDB", location, processID)
	if err := p.productRepo.DeleteProduct(ctx, id); err != nil {
		util.LogError(ctx.Context(), "Failed to delete product from MongoDB: "+err.Error(), location, processID)
		return ctx.Status(fiber.StatusInternalServerError).SendString("failed to delete product from MongoDB: " + err.Error())
	}

	util.LogSuccess(ctx.Context(), "Successfully deleted product with ID: "+id, location, processID)

	return ctx.Status(fiber.StatusOK).SendString("product deleted successfully")
}
