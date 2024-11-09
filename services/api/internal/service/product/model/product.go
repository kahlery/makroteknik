package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Product struct {
	ID          primitive.ObjectID  `bson:"_id,omitempty" json:"id"`
	CategoryId  string              `json:"categoryId"`
	Title       string              `json:"title"`
	ProductCode string              `json:"productCode"`
	Description string              `json:"description"`
	SizeToPrice []map[string]string `json:"sizeToPrice"`
}
