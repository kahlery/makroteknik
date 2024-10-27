package auth

import (
	"api/internal/service/auth/dto"
	"api/internal/service/auth/repo"
	"api/pkg/util"
	"log"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

type AuthService struct {
	mongoClient *mongo.Client
	userRepo    *repo.UserRepo
}

func NewAuthService(mongoClient *mongo.Client, userRepo *repo.UserRepo) *AuthService {
	return &AuthService{
		mongoClient: mongoClient,
		userRepo:    userRepo,
	}
}

// functions: --------------------------------------------------------------------

func (a *AuthService) Login(c *fiber.Ctx) error {
	var req dto.LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid input")
	}

	user, err := a.userRepo.FindByUserName(c.Context(), req.UserName)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).SendString("Invalid credentials")
	}

	err = util.CompareHashAndPassword([]byte(user.HashedPassword), []byte(req.Password))
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).SendString("Invalid credentials")
	}

	log.Printf("Generating token for req:%s found:%s", req.UserName, user.UserName)

	// Generate token
	token, err := util.GenerateToken(user.UserName)
	if err != nil {
		log.Printf("Error in generating token: %v", err)
	}

	return c.JSON(dto.LoginResponse{Token: token})
}
