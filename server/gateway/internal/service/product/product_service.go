// server/gateway/internal/service/product/product_service.go

package product

import (
	"context"
	"gateway/internal/service/product/repo"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

// productRepo is the repository for product service
var productRepo *repo.ProductRepo

// s3Client is the client for s3 service
var s3Client *s3.Client

// InitProductService function initializes the product service
//   - Parameters: client *mongo.Client: instance of mongo.Client
func InitProductService(client *mongo.Client) {
	productRepo = repo.NewProductRepo(client)

	// Load the default config.
	// This will get AWS_REGION, AWS_ACCESS_KEY and AWS_SECRET_ACCESS_KEY from .env
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		panic("unable to load AWS SDK config, " + err.Error())
	}
	s3Client = s3.NewFromConfig(cfg)
}

// GetProduct fetches products from MongoDB, then fetches their images from S3
func GetProducts(c *fiber.Ctx) error {
	// 1. Fetch products from MongoDB
	products, err := productRepo.GetProducts(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("failed to fetch products from mongo: " + err.Error())
	}

	// 2. Fetch all images from the S3 folder
	imageURLs, err := listImagesInS3Folder("makroteknik/products")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("failed to list images using AWS S3: " + err.Error())

	}

	// 3. Match images with products and assign the image URLs
	for i, product := range products {
		// Example matching logic: Check if the image name contains the product title or product code
	}
}
