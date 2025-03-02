package middleware

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

func LogInMiddle() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Log request with white foreground color
		fmt.Printf("\n\033[37m[REQUEST]\033[0m %s %s %s\n", c.Method(), c.Path(), time.Now().Format(time.RFC3339))

		// Process the request
		err := c.Next()

		// Log response with white foreground color
		fmt.Printf("\n\033[37m[RESPONSE]\033[0m %s %s | Status: %d | Time: %s", c.Method(), c.Path(), c.Response().StatusCode(), time.Since(time.Now()).String())

		return err
	}
}
