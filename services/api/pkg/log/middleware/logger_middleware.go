package middleware

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

func LogInMiddle() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Log request
		fmt.Printf("\n\033[44;37m[REQUEST]\n\033[0m %s %s %s\n", c.Method(), c.Path(), time.Now().Format(time.RFC3339))

		// Process the request
		err := c.Next()

		// Log response
		fmt.Printf("\n\033[45;37m[RESPONSE]\n\033[0m %s %s | Status: %d | Time: %s", c.Method(), c.Path(), c.Response().StatusCode(), time.Since(time.Now()).String())

		return err
	}
}
