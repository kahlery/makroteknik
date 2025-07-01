package repo

import (
	"context"
	"encoding/json"

	log "github.com/kahlery/pkg/go/log/util"

	"api/internal/service/product/model"

	"github.com/gofiber/fiber/v2"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ProductRepo struct {
	collection *mongo.Collection
}

func NewProductRepo(client *mongo.Client) *ProductRepo {
	return &ProductRepo{
		collection: client.Database("makroteknik").Collection("products_2"),
	}
}

// functions: --------------------------------------------------------------------

func (r *ProductRepo) GetProduct(ctx *fiber.Ctx, id string) (model.Product, error) {
	filter := bson.M{"_id": id}
	var product model.Product
	err := r.collection.FindOne(ctx.Context(), filter).Decode(&product)
	return product, err
}

func (r *ProductRepo) GetProducts(ctx *fiber.Ctx) ([]model.Product, error) {
	// 1. Perform a MongoDb query to fetch all documents in the products collection
	cursor, err := r.collection.Find(ctx.Context(), bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx.Context())

	// 2. Read all products from the cursor into the list
	var productList []model.Product

	if err := cursor.All(ctx.Context(), &productList); err != nil {
		return nil, err
	}

	// get is sucessfull, print the last element of the list
	if len(productList) > 0 {
		// Get the last element in the productList
		last, err := json.Marshal(productList[len(productList)-1])

		if err != nil {
			log.LogError(nil, "unable to json.Marshall last product", "", "")
		}

		log.LogSuccess(context.TODO(), string(last), "", "")
	}

	// 3. Return the productList
	return productList, nil
}

func (r *ProductRepo) UpdateProduct(ctx *fiber.Ctx, product model.Product, id string) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{
		"$set": bson.M{
			"category":     product.Category,
			"title":        product.Title,
			"product_code": product.ProductCode,
			"description":  product.Description,
			"size_2_price": product.SizeToPrice,
		},
	}

	_, err = r.collection.UpdateOne(ctx.Context(), filter, update)
	return err
}

func (r *ProductRepo) AddProduct(ctx *fiber.Ctx, product model.Product) error {
	_, err := r.collection.InsertOne(ctx.Context(), product)
	return err
}

func (r *ProductRepo) DeleteProduct(ctx *fiber.Ctx, id string) error {
	// Convert the string ID to an ObjectId
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err // Return error if conversion fails
	}

	// Create a filter to find the document to delete
	filter := bson.M{"_id": objectID}

	// Call the DeleteOne method
	_, err = r.collection.DeleteOne(ctx.Context(), filter)
	return err // Return any errors that occur during deletion
}
