// server/gateway/internal/service/product/repo/product_repo.go

package repo

import (
	"context"
	"encoding/json"
	"fmt"
	"gateway/internal/service/product/model"
	"gateway/pkg/tool"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// ProductRepo struct is a type that has a mongodb collection
type ProductRepo struct {
	collection *mongo.Collection
}

// NewProductRepo constructor gets Client pointer
//   - Parameters: Address of a Client instance from mongo package
//   - Returns: Pointer of the instance of the ProductRepo
func NewProductRepo(client *mongo.Client) *ProductRepo {
	return &ProductRepo{
		collection: client.Database("makroteknik").Collection("products"),
	}
}

// GetProducts function runs a mongodb query to get all products. It returns a list of products
//   - Receiver: r ProductRepo: instance of ProductRepo struct
//   - Parameters: ctx Context: instance from context package
//   - Returns: productList []Product: list of all products
func (r *ProductRepo) GetProducts(ctx context.Context) ([]model.Product, error) {
	// 1. Perform a MongoDb query to fetch all documents in the products collection
	cursor, err := r.collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	// 2. Read all products from the cursor into the list
	var productList []model.Product

	if err := cursor.All(ctx, &productList); err != nil {
		return nil, err
	}

	// Fetch is sucessfull, print the last element of the list
	if len(productList) > 0 {
		// Get the last element in the productList
		last := productList[len(productList)-1]

		// Convert the last product to a beautified JSON string
		beautified, err := json.MarshalIndent(last, " ", " ")
		if err != nil {
			return nil, err
		}

		tool.LogSuccess("Fetch is succesfull from MongoDB!")
		fmt.Println("Last element in the list from db:")
		fmt.Println(string(beautified))
		fmt.Println()
	}

	// 3. Return the productList
	return productList, nil
}

// UpdateProduct function runs a mongodb query to update a product. It returns an error
//   - Receiver: r ProductRepo: instance of ProductRepo struct
//   - Parameters: ctx Context: instance from context package, product Product: instance of Product struct
//   - Returns: error: error message
func (r *ProductRepo) UpdateProduct(ctx context.Context, product model.Product) error {
	_, err := r.collection.UpdateOne(ctx, bson.M{"_id": product.ID}, bson.M{"$set": product})
	return err
}

// AddProduct function runs a mongodb query to add a product. It returns an error
//   - Receiver: r ProductRepo: instance of ProductRepo struct
//   - Parameters: ctx Context: instance from context package, product Product: instance of Product struct
//   - Returns: error: error message
func (r *ProductRepo) AddProduct(ctx context.Context, product model.Product) error {
	_, err := r.collection.InsertOne(ctx, product)
	return err
}

// DeleteProduct function runs a mongodb query to delete a product. It returns an error
//   - Receiver: r ProductRepo: instance of ProductRepo struct
//   - Parameters: ctx Context: instance from context package, product Product: instance of Product struct
//   - Returns: error: error message
func (r *ProductRepo) DeleteProduct(ctx context.Context, product model.Product) error {
	_, err := r.collection.DeleteOne(ctx, bson.M{"_id": product.ID})
	return err
}
