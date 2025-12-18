package main

import (
	// Standart
	"context"
	"fmt"
	"os"

	// Services | Handlers
	// auth_service "api/internal/service/auth/service"
	category_service "api/internal/service/category/service"
	email_service "api/internal/service/email"
	health_service "api/internal/service/health/service"
	pdf_service "api/internal/service/pdf/service"
	product_service "api/internal/service/product/service"

	// Repos
	// auth_repo "api/internal/service/auth/repo"
	category_repo "api/internal/service/category/repo"
	product_repo "api/internal/service/product/repo"

	// kahlery deps
	// auth_middleware "github.com/kahlery/pkg/go/auth/middleware/fiber"
	aws_service "github.com/kahlery/pkg/go/aws/service"

	log_middleware "github.com/kahlery/pkg/go/log/middleware/fiber"

	log "github.com/kahlery/pkg/go/log/util"

	// Framework deps
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	// DB deps
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	// Other deps
)

// --------------------------------------------------------------------

var (
	s3Client    *aws_service.S3Service
	mongoClient *mongo.Client
)

var (
	healthService *health_service.HealthService
	emailService  *email_service.EmailService
	// authService     *auth_service.AuthService
	productService  *product_service.ProductService
	categoryService *category_service.CategoryService
	pdfService      *pdf_service.PDFService
)

var (
	// userRepo     *auth_repo.UserRepo
	productRepo  *product_repo.ProductRepo
	categoryRepo *category_repo.CategoryRepo
	// postRepo *postPackage.PostRepo
)

var imagePath = new(string)
var pdfPath = new(string)

// --------------------------------------------------------------------

func init() {
	log.Initialize()

	*imagePath = "images/"
	*pdfPath = "pdfs/"

	initClients()
	initRepos()
	initServices()

	// check if the program can reach the working directory
	dir, err := os.Getwd()
	if err != nil {
	} else {
		fmt.Println(dir)
	}

	// check if all clients initialized successfully
	if s3Client == nil || mongoClient == nil {
	}
}

func main() {
	app := fiber.New(fiber.Config{
		AppName: "api",
	})

	setupMiddlewares(app)
	setupRoutes(app)

	port := os.Getenv("PORT")
	log.LogInfo(nil, fmt.Sprintf("Starting server on %s", port), "", "")
	if err := app.Listen(port); err != nil {
		// log.Fatalf("failed to start server: %v", err)
	}
}

// inits: --------------------------------------------------------------------

func initClients() {
	s3Client = aws_service.NewS3Service()
	mongoClient = setupDbConnection()
}

func initRepos() {
	// userRepo = auth_repo.NewUserRepo(mongoClient)
	productRepo = product_repo.NewProductRepo(mongoClient)
	categoryRepo = category_repo.NewCategoryRepo(mongoClient)
	// postRepo = postPackage.NewPostRepo(mongoClient)
}

func initServices() {
	healthService = health_service.NewHealthService(mongoClient)
	emailService = email_service.NewEmailService()
	// authService = auth_service.NewAuthService(userRepo)
	productService = product_service.NewProductService(productRepo, s3Client, imagePath)
	categoryService = category_service.NewCategoryService(categoryRepo)
	pdfService = pdf_service.NewPDFService(pdfPath, s3Client)
}

// Setups --------------------------------------------------------------------

func setupDbConnection() *mongo.Client {
	mongoClient, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(os.Getenv("DB")))
	if err != nil {
		panic(err)
	}
	return mongoClient
}

func setupRoutes(app *fiber.App) {
	// Ping check
	app.Get("/ping", healthService.GetHealth)

	// Email
	app.Post("/send-cart-email", emailService.SendCartEmail)

	// Auth routes
	// authGroup := app.Group("/auth")
	// authGroup.Post("/login", authService.Login)

	// Product routes
	productGroup := app.Group("/product")
	productGroup.Get("/", productService.GetProducts)
	// productGroup.Post("/post", productService.PostProduct, auth_middleware.AuthMiddleware)
	// productGroup.Patch("/patch/:id", productService.PatchProduct, auth_middleware.AuthMiddleware)
	// productGroup.Delete("/delete/:id", productService.DeleteProduct, auth_middleware.AuthMiddleware)

	// Category routes
	// categoryGroup := app.Group("/category")
	// categoryGroup.Get("/", categoryService.GetCategories, auth_middleware.AuthMiddleware)
	// categoryGroup.Post("/post", categoryService.PostCategory, auth_middleware.AuthMiddleware)
	// categoryGroup.Patch("/patch/:id", categoryService.PatchCategory, auth_middleware.AuthMiddleware)
	// categoryGroup.Delete("/delete/:id", categoryService.DeleteCategory, auth_middleware.AuthMiddleware)

	// Static routes
	staticGroup := app.Group("/static")
	// pdf:
	staticGroup.Get("pdf/is-exist/:id", pdfService.GetFileMeta)
	staticGroup.Get("/pdf/:id", pdfService.GetPDFFile)
	staticGroup.Post("/pdf/upload/:id/:title", pdfService.PostPDFFile)
	staticGroup.Get("/pdf/meta/:id", pdfService.GetFileMeta)
	staticGroup.Delete("/pdf/delete/:id", pdfService.DeletePDFFile)
}

func setupMiddlewares(app *fiber.App) {
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000, https://makroteknik-4yemjdfdu-vafaill.vercel.app, https://makroteknik.vercel.app, https://test.makroteknik.co.uk, https://makroteknik.co.uk",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	// Adding custom marker for every process in request-response cycle
	app.Use(log_middleware.MarkProcess())

	// Adding custom logger middleware to log requests as well
	app.Use(log_middleware.LogRequests())
	app.Use(log_middleware.LogResponses())

}
