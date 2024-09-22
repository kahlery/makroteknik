package product

import (
	"github.com/gofiber/fiber/v2"
)

func GetProducts(c *fiber.Ctx) error {
	return c.SendString("product")
}

func AddProduct(c *fiber.Ctx) error {
	return c.SendString("Product has been added")
}

func UpdateProduct(c *fiber.Ctx) error {
	return c.SendString("Product has been updated")
}

func DeleteProduct(c *fiber.Ctx) error {
	return c.SendString("Product has been deleted")
}
