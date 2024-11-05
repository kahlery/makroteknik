package repo

import (
	"api/internal/service/category/model"
	"api/pkg/util"
	"context"
	"encoding/json"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type CategoryRepo struct {
	collection *mongo.Collection
}

func NewCategoryRepo(client *mongo.Client) *CategoryRepo {
	return &CategoryRepo{
		collection: client.Database("makroteknik").Collection("categories"),
	}
}

// functions: --------------------------------------------------------------------

func (c *CategoryRepo) GetCategories(ctx context.Context) ([]model.Category, error) {
	// 1. mongo query to fetch all documents in the products collection
	cursor, err := c.collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	// 2. Read all products from the cursor into the list
	var categoryList []model.Category

	if err := cursor.All(ctx, &categoryList); err != nil {
		return nil, err
	}

	// got categories from mongo:
	if len(categoryList) > 0 {
		// get the last element in the productList
		last := categoryList[len(categoryList)-1]

		// conver the last product to a beautified JSON string
		beautified, err := json.MarshalIndent(last, " ", " ")
		if err != nil {
			return nil, err
		}

		util.LogSuccess("got categories from mongo, showing latest:")
		fmt.Println(string(beautified))
		fmt.Println()
	}

	// 3. Return the productList
	return categoryList, nil
}
