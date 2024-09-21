package main

import (
	"center/internal/service/auth"
	"center/internal/service/product"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
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
	app := fiber.New()

	// Set the routes
	setupRoutes(app)

	// Start serving
	port := os.Getenv("PORT")
	log.Printf("Starting server on %s", port)
	if err := app.Listen(port); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}

func setupRoutes(app *fiber.App) {
	// Auth routes
	authGroup := app.Group("/auth")
	authGroup.Post("/login", auth.Login)

	// Product routes
	productGroup := app.Group("/products")
	productGroup.Get("/", product.GetProducts)
}
