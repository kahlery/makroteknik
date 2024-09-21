package auth

import (
	"github.com/gofiber/fiber/v2"
)

func Login(c *fiber.Ctx) error {
	// Implement login logic
	return c.SendString("Login")
}

func Register(c *fiber.Ctx) error {
	// Implement register logic
	return c.SendString("Register")
}
