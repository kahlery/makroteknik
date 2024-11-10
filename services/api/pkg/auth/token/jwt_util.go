package token

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

var secretKey = []byte(os.Getenv("TOKEN_SECRET"))

func GenerateToken(userName string) (string, error) {
	tokenClaims := jwt.MapClaims{
		"userName": userName,
		"exp":      time.Now().Add(time.Minute * 30).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, tokenClaims)
	return token.SignedString(secretKey)
}

// VerifyToken checks if the token is valid
func VerifyToken(tokenStr string) (*jwt.Token, error) {
	// Parse the token
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		// Make sure the signing method is correct (HS256)
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return secretKey, nil
	})

	// Return the parsed token and error (if any)
	return token, err
}
