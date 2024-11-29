package service

import (
	"log"

	"api/pkg/aws/service"

	"github.com/gofiber/fiber/v2"
)

type PDFService struct {
	dirPath   string
	s3Service service.S3Service
}

func NewPDFService(p *string, s3 *service.S3Service) *PDFService {
	return &PDFService{
		dirPath:   *p,
		s3Service: *s3,
	}
}

func (p *PDFService) GetPdfFile(c *fiber.Ctx) error {
	id := c.Params("id")

	// S3 file path and name
	fileName := id + ".pdf"

	// fetch the PDF from S3
	fileData, err := p.s3Service.GetFile(&p.dirPath, &fileName)
	if err != nil {
		log.Printf("failed to fetch file %v", err)
		return c.Status(fiber.StatusInternalServerError).SendString("Error fetching PDF")
	}

	// set content-type for PDF
	c.Set("Content-Type", "application/pdf")
	return c.Send(fileData)
}

func (p *PDFService) IsFileExist(c *fiber.Ctx) error {
	id := c.Params("id")

	// S3 file path and name
	fileName := id + ".pdf"

	res, err := p.s3Service.IsFileExist(p.dirPath, fileName)

	if err != nil {
		log.Printf("failed to check existence of the pdf %v", err)
		return c.Status(fiber.StatusInternalServerError).SendString("Error checking existence of the PDF")
	}

	return c.JSON(fiber.Map{
		"isPDFExist": res,
	})
}
