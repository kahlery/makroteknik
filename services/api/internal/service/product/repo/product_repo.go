package repo

import (
	"api/internal/service/product/model"
	log "api/pkg/log/util"
	"encoding/json"
	"fmt"

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
		collection: client.Database("makroteknik").Collection("products"),
	}
}

// functions: --------------------------------------------------------------------

func (r *ProductRepo) GetProduct(ctx *fiber.Ctx, id string) (model.Product, error) {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return model.Product{}, err
	}

	filter := bson.M{"_id": objectID}
	var product model.Product
	err = r.collection.FindOne(ctx.Context(), filter).Decode(&product)
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
		last := productList[len(productList)-1]

		// Convert the last product to a beautified JSON string
		beautified, err := json.MarshalIndent(last, " ", " ")
		if err != nil {
			return nil, err
		}

		log.LogSuccess("got products from mongo, showing latest:", "ProductRepo.GetProducts()", ctx.Locals("processID").(string))
		fmt.Println(string(beautified))
		fmt.Println()
	}

	// 3. Return the productList
	return productList, nil
}

func (r *ProductRepo) UpdateProduct(ctx *fiber.Ctx, product model.Product, id string) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.LogError("mongo: error converting id to objectId, "+err.Error(), "ProductRepo.UpdateProduct()", ctx.Locals("processID").(string))
		return err
	}

	log.LogTask("mongo: Updating product with ID: "+id, "ProductRepo.UpdateProduct()", ctx.Locals("processID").(string))

	filter := bson.M{"_id": objectID}
	update := bson.M{
		"$set": bson.M{
			"categoryID":  product.CategoryID,
			"title":       product.Title,
			"productCode": product.ProductCode,
			"description": product.Description,
			"sizeToPrice": product.SizeToPrice,
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
