package health

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

type HealthService struct {
	mongoClient *mongo.Client
}

func NewHealthService(mongoClient *mongo.Client) *HealthService {
	return &HealthService{
		mongoClient: mongoClient,
	}
}

// functions: --------------------------------------------------------------------

func (h *HealthService) GetHealth(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": "ok",
		"endpoints": []string{
			"/health",
			"/auth/login",
			"/auth/register",
			"/products",
			"/categories",
		},
	})
}
