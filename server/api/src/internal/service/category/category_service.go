package category

import (
	"api/src/internal/service/category/dto"
	"api/src/internal/service/category/repo"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

var categoryRepo *repo.CategoryRepo

func InitCategoryService(client *mongo.Client) {
	categoryRepo = repo.NewCategoryRepo(client)
}

func GetCategories(c *fiber.Ctx) error {
	categories, err := categoryRepo.GetCategories(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.Status(fiber.StatusOK).JSON(dto.CategoryResponse{
		Categories: categories,
	})
}
