package repo

import (
	"context"
	"gateway/internal/service/product/model"

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
	cursor, err := r.collection.Find(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var productList []model.Product
	if err := cursor.All(ctx, &productList); err != nil {
		return nil, err
	}
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
