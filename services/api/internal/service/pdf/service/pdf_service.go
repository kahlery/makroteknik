package service

import (
	"api/pkg/log"
	"io"

	"api/pkg/aws/service"

	"github.com/gofiber/fiber/v2"
)

type PDFService struct {
	dirPath   *string
	s3Service *service.S3Service
}

func NewPDFService(pdfPath *string, s3 *service.S3Service) *PDFService {
	return &PDFService{
		dirPath:   pdfPath,
		s3Service: s3,
	}
}

func (p *PDFService) GetFileMeta(c *fiber.Ctx) error {
	// Parse the ID parameter from the URL
	id := c.Params("id")
	if id == "" {
		log.LogError("missing id parameter in GetFileMeta")
		return c.Status(fiber.StatusBadRequest).SendString("Missing id parameter")
	}

	// S3 file path and name
	fileName := id + ".pdf"

	// Fetch metadata for the PDF file from S3
	meta, err := p.s3Service.GetObjectMeta(*p.dirPath, fileName)
	if err != nil {
		log.LogError("failed to fetch file metadata: " + err.Error())
		return c.Status(fiber.StatusInternalServerError).SendString("Error fetching file metadata")
	}

	// Create a map to store the metadata
	metaInfo := map[string]interface{}{
		"Size":         *meta.ContentLength, // file size in bytes
		"ContentType":  *meta.ContentType,   // content type (application/pdf)
		"LastModified": *meta.LastModified,  // last modified date
	}

	// Return metadata as JSON response
	return c.JSON(metaInfo)
}

func (p *PDFService) GetPDFFile(c *fiber.Ctx) error {
	id := c.Params("id")
	// S3 file path and name
	fileName := id + ".pdf"

	// fetch the PDF from S3
	fileData, err := p.s3Service.GetObject(p.dirPath, &fileName)
	if err != nil {
		log.LogError("failed to fetch file: " + err.Error())
		return c.Status(fiber.StatusInternalServerError).SendString("Error fetching PDF")
	}

	// set content-type for PDF
	c.Set("Content-Type", "application/pdf")
	return c.Send(fileData)
}

func (p *PDFService) PostPDFFile(c *fiber.Ctx) error {
	// parse the ID parameter from the URL
	id := c.Params("id")
	if id == "" {
		log.LogError("missing id parameter on UploadPDFFile")
		return c.Status(fiber.StatusBadRequest).SendString("Missing id parameter")
	}

	// get the file from the request body
	file, err := c.FormFile("file")
	if err != nil {
		log.LogError("failed to parse uploaded file: " + err.Error())
		return c.Status(fiber.StatusBadRequest).SendString("Error on parsing uploaded file")
	}

	// open the file
	fileData, err := file.Open()
	if err != nil {
		log.LogError("failed to open uploaded file: " + err.Error())
		return c.Status(fiber.StatusInternalServerError).SendString("Error opening uploaded file")
	}
	defer fileData.Close()

	// read file content
	fileBytes, err := io.ReadAll(fileData)
	if err != nil {
		log.LogError("failed to read uploaded file: " + err.Error())
		return c.Status(fiber.StatusInternalServerError).SendString("Error reading uploaded file")
	}

	// S3 file path and name
	fileName := id + ".pdf"

	// upload the file to S3
	err = p.s3Service.PostObject(p.dirPath, &fileName, fileBytes)
	if err != nil {
		log.LogError("failed to upload file to S3: " + err.Error())
		return c.Status(fiber.StatusInternalServerError).SendString("Error uploading file to S3")
	}

	// return success response
	return c.Status(fiber.StatusOK).SendString("File uploaded successfully")
}
