package dto

import "api/src/internal/service/category/model"

type CategoryResponse struct {
	Categories []model.Category `json:"categories"`
}
