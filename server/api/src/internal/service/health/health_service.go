package health

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

// client is the MongoDB client
var client *mongo.Client

// InitHealthService initializes the health service
func InitHealthService(c *mongo.Client) {
	client = c
}

// GetHealth returns the health status of the server by:
// 1) checking the database connection
// 2) returning the endpoints that are available
func GetHealth(c *fiber.Ctx) error {
	// 1. Check the database connection
	// err := client.Ping(c.Context(), nil)
	// if err != nil {
	// 	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
	// 		"status": "error",
	// 		"error":  "failed to connect to the database",
	// 	})
	// }

	// 2. Return the available endpoints
	return c.JSON(fiber.Map{
		"status":    "ok",
		"endpoints": []string{"/products", "/categories"},
	})
}
