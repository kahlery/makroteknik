package auth

import (
	// Internal
	"api/internal/service/auth/dto"
	"api/internal/service/auth/repo"

	// kahlery
	auth_token "github.com/kahlery/pkg/go/auth/token"
	log_util "github.com/kahlery/pkg/go/log/util"

	// Dependencies
	"github.com/gofiber/fiber/v2"
)

type AuthService struct {
	userRepo *repo.UserRepo
}

func NewAuthService(userRepo *repo.UserRepo) *AuthService {
	return &AuthService{
		userRepo: userRepo,
	}
}

// functions: --------------------------------------------------------------------

func (a *AuthService) Login(c *fiber.Ctx) error {
	var req dto.LoginRequest
	if err := c.BodyParser(&req); err != nil {
		log_util.LogError("Error in parsing request body: %v"+err.Error(), "AuthService.Login", c.Locals("processID").(string))
		return c.Status(fiber.StatusBadRequest).SendString("Invalid input")
	}

	user, err := a.userRepo.FindByUserName(c.Context(), req.Username)
	if err != nil {
		log_util.LogError("Error in parsing request body: %v"+req.Username+req.Password+err.Error(), "AuthService.Login()", c.Locals("processID").(string))
		return c.Status(fiber.StatusUnauthorized).SendString("Invalid credentials")
	}

	err = auth_token.CompareHashAndPassword([]byte(user.HashedPassword), []byte(req.Password))
	if err != nil {
		log_util.LogError("Error in parsing request body: %v"+err.Error(), "AuthService.Login", c.Locals("processID").(string))
		return c.Status(fiber.StatusUnauthorized).SendString("Invalid credentials")
	}

	// Generate token
	token, err := auth_token.GenerateToken(user.Username)
	if err != nil {
		log_util.LogError("Error in parsing request body: %v"+err.Error(), "AuthService.Login", c.Locals("processID").(string))
		return c.Status(fiber.StatusInternalServerError).SendString("Failed to generate token")
	}

	return c.JSON(dto.LoginResponse{Token: token})
}
