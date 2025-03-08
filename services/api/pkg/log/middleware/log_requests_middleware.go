package middleware

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

func LogRequests() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		if ctx.Path() == "/ping" {
			return ctx.Next()
		}

		// Log request with white foreground color
		fmt.Printf("\n\033[44m[REQUEST]\033[0m | %s | %s | %s | %s\n", ctx.Locals("processID"), ctx.Method(), ctx.Path(), time.Now().Format(time.RFC3339))

		// Process the request
		err := ctx.Next()

		// Log response with white foreground color
		// fmt.Printf("\n\033[37m[RESPONSE]\033[0m %s %s | Status: %d | Time: %s", c.Method(), c.Path(), c.Response().StatusCode(), time.Since(time.Now()).String())

		return err
	}
}
