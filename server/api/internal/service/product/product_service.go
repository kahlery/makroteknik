package product

import (
	"github.com/gofiber/fiber/v2"
)

func GetProducts(c *fiber.Ctx) error {
	return c.SendString("product")
}
