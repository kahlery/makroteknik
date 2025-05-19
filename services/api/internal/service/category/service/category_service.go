package category

import (
	"api/internal/service/category/dto"
	"api/internal/service/category/model"
	"api/internal/service/category/repo"
	"log"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CategoryService struct {
	categoryRepo *repo.CategoryRepo
}

func NewCategoryService(categoryRepo *repo.CategoryRepo) *CategoryService {
	return &CategoryService{
		categoryRepo: categoryRepo,
	}
}

// GetCategories handles fetching all categories
func (cs *CategoryService) GetCategories(ctx *fiber.Ctx) error {
	categories, err := cs.categoryRepo.GetCategories(ctx.Context())
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	return ctx.Status(fiber.StatusOK).JSON(dto.CategoryResponse{
		Categories: categories,
	})
}

// PostCategory handles adding a new category
func (cs *CategoryService) PostCategory(ctx *fiber.Ctx) error {
	var categoryRaw dto.CategoryRequest
	if err := ctx.BodyParser(&categoryRaw); err != nil {
		return ctx.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	category := model.Category{
		ID:           primitive.NewObjectID(),
		CategoryName: categoryRaw.CategoryName,
		OrderIndex:   categoryRaw.OrderIndex,
	}

	newCategory, err := cs.categoryRepo.CreateCategory(ctx.Context(), category)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return ctx.Status(fiber.StatusOK).JSON(newCategory)
}

// PatchCategory handles updating an existing category
func (cs *CategoryService) PatchCategory(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	var categoryRaw dto.CategoryRequest
	if err := ctx.BodyParser(&categoryRaw); err != nil {
		return ctx.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	categoryID, err := primitive.ObjectIDFromHex(categoryRaw.ID)
	if err != nil {
		log.Fatalf("Invalid ObjectID: %v", err)
	}

	category := model.Category{
		ID:           categoryID,
		CategoryName: categoryRaw.CategoryName,
	}

	updatedCategory, err := cs.categoryRepo.UpdateCategory(ctx.Context(), id, category)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return ctx.Status(fiber.StatusOK).JSON(updatedCategory)
}

// DeleteCategory handles deleting a category
func (cs *CategoryService) DeleteCategory(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	err := cs.categoryRepo.DeleteCategory(ctx.Context(), id)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return ctx.Status(fiber.StatusOK).SendString("Category deleted successfully")
}
