package product

import (
	"github.com/gofiber/fiber/v2"
)

func List(c *fiber.Ctx) error {
	// Implement list products logic
	return c.SendString("List Products")
}

func Create(c *fiber.Ctx) error {
	// Implement create product logic
	return c.SendString("Create Product")
}
