package product

import (
	"api/internal/service/product/repo"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

var productRepo *repo.ProductRepo

// InitProductService function initializes the product service
//   - Parameters: client *mongo.Client: instance of mongo.Client
func InitProductService(client *mongo.Client) {
	productRepo = repo.NewProductRepo(client)
}

func GetProducts(c *fiber.Ctx) error {
	products, err := productRepo.GetProducts(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.JSON(products)
}
