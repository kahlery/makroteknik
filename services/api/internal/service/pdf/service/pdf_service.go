package service

import (
	// Standart
	"io"

	// kahlery
	aws_service "github.com/kahlery/pkg/go/aws/service"

	// Third
	"github.com/gofiber/fiber/v2"
)

// --------------------------------------------------------------------

type PDFService struct {
	dirPath   *string
	s3Service *aws_service.S3Service
}

// --------------------------------------------------------------------

func NewPDFService(pdfPath *string, s3 *aws_service.S3Service) *PDFService {
	return &PDFService{
		dirPath:   pdfPath,
		s3Service: s3,
	}
}

// --------------------------------------------------------------------

func (p *PDFService) GetFileMeta(ctx *fiber.Ctx) error {
	// Parse the ID parameter from the URL
	id := ctx.Params("id")
	if id == "" {
		return ctx.Status(fiber.StatusBadRequest).SendString("Missing id parameter")
	}

	// S3 file path and name
	fileName := id + ".pdf"

	// Fetch metadata for the PDF file from S3
	headData, err := p.s3Service.GetObjectHead(*p.dirPath, fileName, ctx.Locals("processID").(string))
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("Error fetching file metadata")
	}

	// Create a map to store the metadata
	metaInfo := map[string]interface{}{
		"Size":         *headData.ContentLength, // file size in bytes
		"ContentType":  *headData.ContentType,   // content type (application/pdf)
		"LastModified": *headData.LastModified,  // last modified date
		"Title":        headData.Metadata["title"],
	}

	// Return metadata as JSON response
	return ctx.JSON(metaInfo)
}

// --------------------------------------------------------------------

func (p *PDFService) GetPDFFile(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	// S3 file path and name
	fileName := id + ".pdf"

	// Fetch the PDF from S3
	// Pass the metaData with _
	fileData, _, err := p.s3Service.GetObject(p.dirPath, &fileName, ctx.Locals("processID").(string))
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("Error fetching PDF")
	}

	// set content-type for PDF and content-disposition for original file name
	ctx.Set("Content-Type", "application/pdf")

	return ctx.Send(fileData)
}

// --------------------------------------------------------------------

func (p *PDFService) PostPDFFile(ctx *fiber.Ctx) error {
	// Parse the ID parameter from the URL
	id := ctx.Params("id")
	if id == "" {
		return ctx.Status(fiber.StatusBadRequest).SendString("Missing id parameter")
	}

	// Get the file from the request body
	file, err := ctx.FormFile("file")
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).SendString("Error parsing uploaded file")
	}

	// Open the file
	fileData, err := file.Open()
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("Error opening uploaded file")
	}
	defer fileData.Close()

	// Read file content
	fileBytes, err := io.ReadAll(fileData)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("Error reading uploaded file")
	}

	// Real file named will be stored in metadata,
	// Cause the file will be saved as id.extension
	fileName := id + ".pdf"
	fileTitle := ctx.Params("title")

	// Upload the file to S3 with metadata
	err = p.s3Service.PostObject(p.dirPath, &fileName, fileBytes, fileTitle, ctx.Locals("processID").(string))
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("Error uploading file to S3")
	}

	// Return success response
	return ctx.Status(fiber.StatusOK).SendString("File uploaded successfully")
}

// --------------------------------------------------------------------

func (p *PDFService) DeletePDFFile(ctx *fiber.Ctx) error {
	// Parse the ID parameter from the URL
	id := ctx.Params("id")
	if id == "" {
		return ctx.Status(fiber.StatusBadRequest).SendString("Missing id parameter")
	}

	// S3 file path and name
	fileName := id + ".pdf"

	// Delete the PDF file from S3
	err := p.s3Service.DeleteObject(*p.dirPath, fileName, ctx.Locals("processID").(string))
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString("Error deleting file from S3")
	}

	// Return success response
	return ctx.Status(fiber.StatusOK).SendString("File deleted successfully")
}
