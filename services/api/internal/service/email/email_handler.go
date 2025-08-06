package email

import (
	"fmt"
	"net/smtp"
	"os"
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
)

type EmailRequest struct {
	CartDetails    string `json:"cartDetails"`
	RecipientEmail string `json:"recipientEmail"`
	Total          string `json:"total"`
}

// --- Rate limiting setup ---
var (
	emailRateLimit      = make(map[string]time.Time)
	emailRateLimitMutex sync.Mutex
	rateLimitDuration   = 1 * time.Minute // 1 email per minute per recipient
)

func SendCartEmail(c *fiber.Ctx) error {
	var req EmailRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	// --- Rate limiting check ---
	emailRateLimitMutex.Lock()
	lastSent, exists := emailRateLimit[req.RecipientEmail]
	if exists && time.Since(lastSent) < rateLimitDuration {
		emailRateLimitMutex.Unlock()
		return c.Status(fiber.StatusTooManyRequests).JSON(fiber.Map{
			"error": "Rate limit exceeded. Please try again later.",
		})
	}
	emailRateLimit[req.RecipientEmail] = time.Now()
	emailRateLimitMutex.Unlock()

	fmt.Println("cartDetails ", req.CartDetails)

	// Compose email body
	subject := "Cart Product Offer Request"
	body := fmt.Sprintf("Hello,\n\nI would like an offer for the following products:\n\n%s\n\nTotal: £%s\n\nThank you.", req.CartDetails, req.Total)

	// SMTP settings
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")
	smtpUser := os.Getenv("SMTP_USER")
	smtpPass := os.Getenv("SMTP_PASS")

	auth := smtp.PlainAuth("", smtpUser, smtpPass, smtpHost)

	msg := []byte("To: " + req.RecipientEmail + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"MIME-Version: 1.0\r\n" +
		"Content-Type: text/plain; charset=\"utf-8\"\r\n\r\n" +
		body)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, smtpUser, []string{req.RecipientEmail}, msg)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to send email",
			"info":  err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "Email sent successfully",
	})
}
