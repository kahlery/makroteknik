package category

import (
	"api/internal/service/category/dto"
	"api/internal/service/category/repo"

	"github.com/gofiber/fiber/v2"
)

type CategoryService struct {
	categoryRepo *repo.CategoryRepo
}

func NewCategoryService(categoryRepo *repo.CategoryRepo) *CategoryService {
	return &CategoryService{
		categoryRepo: categoryRepo,
	}
}

// functions --------------------------------------------------------------------

func (cs *CategoryService) GetCategories(ctx *fiber.Ctx) error {
	categories, err := cs.categoryRepo.GetCategories(ctx.Context())
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return ctx.Status(fiber.StatusOK).JSON(dto.CategoryResponse{
		Categories: categories,
	})
}
