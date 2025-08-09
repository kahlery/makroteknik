package email

import (
	"fmt"
	"net/smtp"
	"os"
	"strings"
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
	// Total         string `json:"total"`
}

var (
	emailRateLimit      = make(map[string]time.Time)
	emailRateLimitMutex sync.Mutex
	rateLimitDuration   = 90 * time.Second
)

type EmailService struct{}

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

func buildProductTable(cartDetails string) string {
	items := strings.Split(cartDetails, "\n")
	var rows string
	for _, item := range items {
		if strings.TrimSpace(item) == "" {
			continue
		}
		rows += fmt.Sprintf("<tr><td style='padding:8px;border:1px solid #ccc;'>%s</td></tr>", item)
	}
	return fmt.Sprintf(`<table style="border-collapse:collapse;width:100%%;margin-top:10px;">
	<tr style="background:#f4f4f4;"><th style="padding:8px;border:1px solid #ccc;">Product</th></tr>
	%s
	</table>`, rows)
}

func (EmailService) SendCartEmail(c *fiber.Ctx) error {
	var req EmailRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

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

	subject := "Cart Product Offer Request"

	productTable := buildProductTable(req.CartDetails)

	sellerBody := fmt.Sprintf(`
	<html>
	<body style="font-family:Arial,sans-serif;color:#333;">
		<h2>New Offer Request</h2>
		<p><strong>Customer Email:</strong> %s</p>
		%s
		<hr>
		<h3>Company Info</h3>
		<p>
		Makro Tech LTD, trading as Makro Teknik
Warehouse Address:
Unit 19a Peacock Industrial Estate, White Hart Lane, London, Tottenham, N17 8DT.
Office Address:
Unit 32 Peacock Industrial Estate, White Hart Lane, London, Tottenham, N17 8DT.
Registered in England and Wales (registered number: 11757043)
</p>
		<p><a href="https://maps.app.goo.gl/Me3yWBfNUs1rEb858">View on Google Maps</a></p>
	</body>
	</html>`, req.CustomerEmail, productTable)

	customerBody := fmt.Sprintf(`
	<html>
	<body style="font-family:Arial,sans-serif;color:#333;">
		<h2>Thank You for Your Request</h2>
		<p>We have received your offer and will contact you soon.</p>
		<p><strong>Your Products:</strong></p>
		%s
		<hr>
		<h3>Our Store Location</h3>
		<p>
		Makro Tech LTD, trading as Makro Teknik
Warehouse Address:
Unit 19a Peacock Industrial Estate, White Hart Lane, London, Tottenham, N17 8DT.
Office Address:
Unit 32 Peacock Industrial Estate, White Hart Lane, London, Tottenham, N17 8DT.
Registered in England and Wales (registered number: 11757043)
</p>
		<p><a href="https://maps.app.goo.gl/Me3yWBfNUs1rEb858">View on Google Maps</a></p>
	</body>
	</html>`, productTable)

	auth := smtp.PlainAuth("", SMTP_USER, SMTP_PASS, SMTP_HOST)

	// ✅ Fix swap: Send customerBody to customer, sellerBody to seller
	msg2Customer := []byte("To: " + req.CustomerEmail + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"MIME-Version: 1.0\r\n" +
		"Content-Type: text/html; charset=\"utf-8\"\r\n\r\n" +
		customerBody)

	msg2Seller := []byte("To: " + SMTP_USER + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"MIME-Version: 1.0\r\n" +
		"Content-Type: text/html; charset=\"utf-8\"\r\n\r\n" +
		sellerBody)

	// Send to customer
	if err := smtp.SendMail(SMTP_HOST+":"+SMTP_PORT, auth, SMTP_USER, []string{req.CustomerEmail}, msg2Customer); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to send email to customer", "info": err.Error()})
	}

	// Send to seller
	if err := smtp.SendMail(SMTP_HOST+":"+SMTP_PORT, auth, SMTP_USER, []string{SMTP_USER}, msg2Seller); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to send email to seller", "info": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Email sent successfully"})
}
