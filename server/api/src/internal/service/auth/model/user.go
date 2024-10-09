package model

type User struct {
	UserName       string `json:"userName"`
	HashedPassword string `json:"hashedPassword"`
}
