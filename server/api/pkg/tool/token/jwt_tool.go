package token

import (
	"time"

	"github.com/golang-jwt/jwt"
)

var secretKey = []byte("makroorkam")

func GenerateToken(userId string) (string, error) {
	tokenClaims := jwt.MapClaims{
		"user_id": userId,
		"exp":     time.Now().Add(time.Hour * 1).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodES256, tokenClaims)
	return token.SignedString(secretKey)
}

func ParseToken(tokenStr string) (*jwt.Token, error) {
	return jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})
}
