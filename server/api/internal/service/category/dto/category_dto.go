package dto

import "api/internal/service/category/model"

type CategoryResponse struct {
	Categories []model.Category `json:"categories"`
}
