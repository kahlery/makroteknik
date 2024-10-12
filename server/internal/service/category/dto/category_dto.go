package dto

import "server/internal/service/category/model"

type CategoryResponse struct {
	Categories []model.Category `json:"categories"`
}
