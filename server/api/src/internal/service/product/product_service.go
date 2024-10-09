// server/api/src/internal/service/product/product_service.go

package product

import (
	"api/src/internal/service/product/dto"
	"api/src/internal/service/product/repo"
	"api/src/pkg/util"
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
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

// bucketName is the working bucket's tag on S3
var bucketName string

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

	// Else log the config content
	util.LogSuccess("AWS SDK config loaded: " + cfg.Region)

	// Get the bucket name from .env
	bucketName = os.Getenv("S3_BUCKET_NAME")

	s3Client = s3.NewFromConfig(cfg)
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

	// 2. Fetch images from S3
	var productResponses []dto.Product
	var imageData string
	for _, product := range products {
		if product.ImageUrl == "" {
			util.LogError("product.ImageUrl is empty")
		} else {
			util.LogWarn("fetching from: " + product.ImageUrl + " ...")
			imageData, err = fetchImageFromS3(product.ImageUrl)
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).SendString("failed to fetch image " + product.ID.Hex() + " from S3: " + err.Error())
			}
		}

		// 3. Prepare the product response with base64 image data
		productResponse := dto.Product{
			ID:          product.ID.Hex(),
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
	res, err := s3Client.GetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: &bucketName,
		Key:    &imageKey,
	})
	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	// 2. Read the image content into memory
	buf := new(bytes.Buffer)
	_, err = io.Copy(buf, res.Body)
	if err != nil {
		return "", nil
	}

	// 3. Encode the image as base64
	imageBase64 := base64.StdEncoding.EncodeToString(buf.Bytes())

	// Return the base64-encoded image data
	return "data:image/png;base64" + imageBase64, nil
}
