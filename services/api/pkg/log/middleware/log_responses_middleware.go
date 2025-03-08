package middleware

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

func LogResponses() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		if ctx.Path() == "/ping" {
			return ctx.Next()
		}

		// Capture the start time to calculate latency
		start := time.Now()

		// Continue to the next middleware or handler
		err := ctx.Next()

		// Calculate latency after the request is processed
		latency := time.Since(start)

		// Log the custom formatted log with color codes
		fmt.Printf("\n\033[45m[RESPONSE]\033[0m | %s | %s | %s | %s | %d | %v | %s\n",
			ctx.Locals("processID"),                     // Process ID (local variable)
			time.Now().Format("02-01-2006 03:04:05 PM"), // Time
			ctx.IP(),                    // Client IP
			ctx.Method(),                // HTTP Method
			ctx.Response().StatusCode(), // HTTP Status Code
			latency,                     // Latency (request processing time)
			ctx.Path())                  // Request path
		return err
	}

}
