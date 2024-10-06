// server/gateway/internal/service/product/model/product.go

package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Product struct {
	ID          primitive.ObjectID  `bson:"_id,omitempty" json:"id"`
	CategoryId  int                 `json:"categoryId"`
	Title       string              `json:"title"`
	ImageUrl    string              `json:"imageUrl"`
	ProductCode string              `json:"productCode"`
	Description string              `json:"description"`
	SizeToPrice []map[string]string `json:"sizeToPrice"`
}
