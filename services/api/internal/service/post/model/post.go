package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Category struct {
	ID          primitive.ObjectID `bson:"_id" json:"id"`
	PostContent string             `bson:"postContent" json:"postContent"`
	PostTitle   string             `bson:"postTitle" json:"postTitle"`
}
