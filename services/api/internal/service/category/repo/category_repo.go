package repo

import (
	"api/internal/service/category/model"
	log "api/pkg/log/util"
	"context"
	"encoding/json"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

// GetCategories fetches all categories from the database
func (c *CategoryRepo) GetCategories(ctx context.Context) ([]model.Category, error) {
	cursor, err := c.collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var categoryList []model.Category
	if err := cursor.All(ctx, &categoryList); err != nil {
		return nil, err
	}

	// Log the latest category for debugging
	if len(categoryList) > 0 {
		last := categoryList[len(categoryList)-1]
		beautified, err := json.MarshalIndent(last, " ", " ")
		if err != nil {
			return nil, err
		}

		log.LogSuccess("got categories from mongo, showing latest:", "CategoryRepo.GetCategories()")
		fmt.Println(string(beautified))
		fmt.Println()
	}

	return categoryList, nil
}

// CreateCategory inserts a new category into the database
func (c *CategoryRepo) CreateCategory(ctx context.Context, category model.Category) (*model.Category, error) {
	result, err := c.collection.InsertOne(ctx, category)
	if err != nil {
		return nil, err
	}

	// Set the generated ID to the category
	category.ID = result.InsertedID.(primitive.ObjectID)
	return &category, nil
}

// UpdateCategory updates an existing category in the database
func (c *CategoryRepo) UpdateCategory(ctx context.Context, id string, category model.Category) (*model.Category, error) {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, fmt.Errorf("invalid category ID: %v", err)
	}

	filter := bson.M{"_id": objID}
	update := bson.M{"$set": bson.M{"name": category.CategoryName}}

	_, err = c.collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return nil, err
	}

	// Fetch the updated category
	var updatedCategory model.Category
	err = c.collection.FindOne(ctx, filter).Decode(&updatedCategory)
	if err != nil {
		return nil, err
	}

	return &updatedCategory, nil
}

// DeleteCategory removes a category from the database
func (c *CategoryRepo) DeleteCategory(ctx context.Context, id string) error {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return fmt.Errorf("invalid category ID: %v", err)
	}

	filter := bson.M{"_id": objID}
	result, err := c.collection.DeleteOne(ctx, filter)
	if err != nil {
		return err
	}

	if result.DeletedCount == 0 {
		return fmt.Errorf("category not found")
	}

	return nil
}
