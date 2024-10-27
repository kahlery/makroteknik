package category

import (
	"api/internal/service/category/dto"
	"api/internal/service/category/repo"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

type CategoryService struct {
	categoryRepo *repo.CategoryRepo
}

func NewCategoryService(m *mongo.Client, c *repo.CategoryRepo) *CategoryService {
	return &CategoryService{
		categoryRepo: c,
	}
}

// functions --------------------------------------------------------------------

func (cs *CategoryService) GetCategories(c *fiber.Ctx) error {
	categories, err := cs.categoryRepo.GetCategories(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.Status(fiber.StatusOK).JSON(dto.CategoryResponse{
		Categories: categories,
	})
}
