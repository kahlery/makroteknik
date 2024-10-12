package main

import (
	"api/src/internal/service/auth"
	"api/src/internal/service/category"
	"api/src/internal/service/product"
	"api/src/pkg/mid"
	"context"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func init() {
	// Load .env file
	if err := godotenv.Load("../../../.env"); err != nil {
		log.Printf("Error loading .env file: %v", err)
	}
}

func main() {
	// Initialize the Fiber app
	app := fiber.New(fiber.Config{
		AppName: "api",
	})

	mongoClient := setupDbConnection()
	initServices(mongoClient)
	setupMiddlewares(app)
	setupRoutes(app)

	// Start serving
	port := os.Getenv("PORT")
	log.Printf("Starting server on %s", port)
	if err := app.Listen(port); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}

func initServices(c *mongo.Client) {
	auth.InitAuthService(c)
	product.InitProductService(c)
	category.InitCategoryService(c)
}

// Set the database connection
func setupDbConnection() *mongo.Client {
	mongoClient, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(os.Getenv("DB")))
	if err != nil {
		panic(err)
	}
	return mongoClient
}

// Set the routes
func setupRoutes(app *fiber.App) {
	// Auth routes
	authGroup := app.Group("/auth")
	authGroup.Post("/login", auth.Login)

	// Product routes
	productGroup := app.Group("/product")
	productGroup.Get("/", product.GetProducts)
	productGroup.Post("/post", product.PostProduct, mid.AuthMiddleware)
	productGroup.Patch("/patch/:id", product.PatchProduct, mid.AuthMiddleware)
	productGroup.Delete("/delete/:id", product.DeleteProduct, mid.AuthMiddleware)

	// Category routes
	categoryGroup := app.Group("/category")
	categoryGroup.Get("/", category.GetCategories)
}

// Set the middlewares
func setupMiddlewares(app *fiber.App) {
	app.Use(logger.New())
	app.Use(cors.New(
		cors.Config{
			AllowOrigins: "http://localhost:3000, https://makroteknik.vercel.app",
			AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		},
	))
}
