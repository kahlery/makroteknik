package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Category struct {
	ID           primitive.ObjectID `bson:"_id" json:"id"`
	CategoryID   int                `bson:"categoryId" json:"categoryId"`
	CategoryName string             `bson:"categoryName" json:"categoryName"`
}
