package repo

import (
	"center/internal/service/auth/model"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepo struct {
	collection *mongo.Collection
}

func NewUserRepo(client *mongo.Client) *UserRepo {
	return &UserRepo{
		collection: client.Database("makroteknik").Collection("users"),
	}
}

func (r *UserRepo) FindByUserName(ctx context.Context, userName string) (*model.User, error) {
	var user model.User

	err := r.collection.FindOne(ctx, bson.M{"userName": userName}).Decode(&user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepo) CreateUser(ctx context.Context, user *model.User) error {
	_, err := r.collection.InsertOne(ctx, user)
	return err
}
