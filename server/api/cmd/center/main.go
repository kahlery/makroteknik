package main

import (
	"center/internal/service/auth"
	"center/internal/service/product"
	"center/pkg/mid"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func init() {
	// Load .env file
	if err := godotenv.Load("../../.env"); err != nil {
		log.Printf("Error loading .env file: %v", err)
	}
}

func main() {
	// Initialize the Fiber app
	app := fiber.New(fiber.Config{
		AppName: "center",
	})

	setupRoutes(app)
	setupMiddlewares(app)

	// Start serving
	port := os.Getenv("PORT")
	log.Printf("Starting server on %s", port)
	if err := app.Listen(port); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}

// Set the routes
func setupRoutes(app *fiber.App) {
	// Auth routes
	authGroup := app.Group("/auth")
	authGroup.Post("/login", auth.Login)

	// Product routes
	productGroup := app.Group("/products", mid.AuthMiddleware)
	productGroup.Get("/", product.GetProducts)
	productGroup.Post("/add", product.AddProduct)
	productGroup.Put("/update", product.UpdateProduct)
	productGroup.Delete("/delete", product.DeleteProduct)
}

// Set the middlewares
func setupMiddlewares(app *fiber.App) {
	app.Use(logger.New())
}
