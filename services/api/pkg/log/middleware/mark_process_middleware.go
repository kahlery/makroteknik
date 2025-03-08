package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func MarkProcess() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		if ctx.Path() == "/ping" {
			return ctx.Next()
		}

		// Generate a new UUID for the process
		processID := uuid.New().String()

		// Add the request ID to the context so that it can be used later
		ctx.Locals("processID", processID)

		// Continue processing the request
		return ctx.Next()
	}
}
