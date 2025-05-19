package dto

import (
	"api/internal/service/category/model"
)

type CategoryRequest struct {
	ID           string `json:"_id,omitempty"`
	CategoryName string `json:"categoryName"`
	OrderIndex   int8   `json:"orderIndex"`
}

type CategoryResponse struct {
	Categories []model.Category `json:"categories"`
}
