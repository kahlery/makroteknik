package email

import (
	"fmt"
	"net/smtp"
	"os"
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
)

var (
	SMTP_HOST string
	SMTP_PASS string
	SMTP_PORT string
	SMTP_USER string
)

type EmailRequest struct {
	CartDetails   string `json:"cartDetails"`
	CustomerEmail string `json:"recipientEmail"`
	Total         string `json:"total"`
}

// --- Rate limiting setup ---
var (
	emailRateLimit      = make(map[string]time.Time)
	emailRateLimitMutex sync.Mutex
	rateLimitDuration   = 90 * time.Second // 1 email per minute per recipient
)

type EmailService struct {
}

func NewEmailService() *EmailService {
	SMTP_HOST = os.Getenv("SMTP_HOST")
	SMTP_PORT = os.Getenv("SMTP_PORT")
	SMTP_USER = os.Getenv("SMTP_USER")
	SMTP_PASS = os.Getenv("SMTP_PASS")

	if SMTP_HOST == "" || SMTP_PORT == "" || SMTP_USER == "" || SMTP_PASS == "" {
		panic("SMTP environment variables are not set properly")
	}

	return &EmailService{}
}

func (EmailService) SendCartEmail(c *fiber.Ctx) error {

	var req EmailRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	// --- Rate limiting check ---
	emailRateLimitMutex.Lock()
	lastSent, exists := emailRateLimit[req.CustomerEmail]
	if exists && time.Since(lastSent) < rateLimitDuration {
		emailRateLimitMutex.Unlock()
		return c.Status(fiber.StatusTooManyRequests).JSON(fiber.Map{
			"error": "Rate limit exceeded. Please try again later.",
		})
	}
	emailRateLimit[req.CustomerEmail] = time.Now()
	emailRateLimitMutex.Unlock()

	fmt.Println("cartDetails ", req.CartDetails)

	subject := "Cart Product Offer Request"
	sellerBody := fmt.Sprintf("Hello,\n\nI would like an offer for the following products:\n\n%s\n\nTotal: £%s\n\nThank you.", req.CartDetails, req.Total)
	customerBody := fmt.Sprintf(`Hello,

Your offer has reached us. We will get in contact with you as soon as possible.

These are the products in the offer you have made:
%v`, req.CartDetails)

	auth := smtp.PlainAuth("", SMTP_USER, SMTP_PASS, SMTP_HOST)

	msg2Customer := []byte("To: " + req.CustomerEmail + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"MIME-Version: 1.0\r\n" +
		"Content-Type: text/plain; charset=\"utf-8\"\r\n\r\n" +
		customerBody)

	msg2Seller := []byte("To: " + req.CustomerEmail + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"MIME-Version: 1.0\r\n" +
		"Content-Type: text/plain; charset=\"utf-8\"\r\n\r\n" +
		sellerBody)

	// To customer
	err := smtp.SendMail(SMTP_HOST+":"+SMTP_PORT, auth, SMTP_USER, []string{SMTP_USER}, msg2Customer)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to send email",
			"info":  err.Error(),
		})
	}

	// To seller
	err = smtp.SendMail(SMTP_HOST+":"+SMTP_PORT, auth, SMTP_USER, []string{req.CustomerEmail}, msg2Seller)
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
