package main

import (
	"center/internal/conf"
	"center/internal/service/auth"
	"center/internal/service/product"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// Load configuration
	conf.LoadConfig()

	// Initialize the Fiber app
	app := fiber.New()

	// Set the routes
	setupRoutes(app)

	// Start serving
	address := conf.Cfg.Server.Address
	log.Printf("Starting server on %s", address)
	if err := app.Listen(address); err != nil {
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
