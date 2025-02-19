package dto

import "api/internal/service/category/model"

type CategoryRequest struct {
	ID           string `json:"_id,omitempty"`
	CategoryName string `json:"categoryName"`
}

type CategoryResponse struct {
	Categories []model.Category `json:"categories"`
}
