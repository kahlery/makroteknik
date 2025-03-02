package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func MarkProcess() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Generate a new UUID for the process
		processID := uuid.New().String()

		// Add the request ID to the context so that it can be used later
		c.Locals("processID", processID)

		// Continue processing the request
		return c.Next()
	}
}
