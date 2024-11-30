package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Product struct {
	ID          primitive.ObjectID  `bson:"_id,omitempty" json:"id"`
	CategoryID  string              `bson:"categoryID" json:"categoryID"`
	Title       string              `bson:"title" json:"title"`
	ProductCode string              `bson:"productCode" json:"productCode"`
	Description string              `bson:"description" json:"description"`
	SizeToPrice []map[string]string `bson:"sizeToPrice" json:"sizeToPrice"`
}
