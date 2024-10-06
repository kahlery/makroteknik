// server/gateway/internal/service/product/product_service.go

package product

import (
	"bytes"
	"context"
	"encoding/base64"
	"gateway/internal/service/product/dto"
	"gateway/internal/service/product/repo"
	"io"
	"os"

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

	// 2. Fetch images from S3
	var productResponses []dto.Product
	for _, product := range products {
		imageData, err := fetchImageFromS3(product.ImageUrl)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("failed to fetch image " + product.ID + " from S3: " + err.Error())
		}

		// 3. Prepare the product response with base64 image data
		productResponse := dto.Product{
			ID:          product.ID,
			CategoryId:  product.CategoryId,
			Title:       product.Title,
			ProductCode: product.ProductCode,
			Description: product.Description,
			SizeToPrice: product.SizeToPrice,
			Image:       imageData,
		}

		productResponses = append(productResponses, productResponse)
	}

	// 4. Return the response
	return c.Status(fiber.StatusOK).JSON(dto.GetProductsResponse{
		Products: productResponses,
	})
}

// fetchImageFromS3 helper function fetches an image from S3 and returns its base64-encoded content
func fetchImageFromS3(imageKey string) (string, error) {
	// 1. Get the image from S3
	bucketName := os.Getenv("S3_BUCKET_NAME")
	resp, err := s3Client.GetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: &bucketName,
		Key:    &imageKey,
	})
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// 2. Read the image content into memory
	buf := new(bytes.Buffer)
	_, err = io.Copy(buf, resp.Body)
	if err != nil {
		return "", nil
	}

	// 3. Encode the image as base64
	imageBase64 := base64.StdEncoding.EncodeToString(buf.Bytes())

	// Return the base64-encoded image data
	return "data:image/png;base64" + imageBase64, nil
}
