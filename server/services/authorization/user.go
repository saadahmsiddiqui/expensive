package authorization

import (
	"context"
	"errors"

	"github.com/golang-jwt/jwt/v5"
	"github.com/saadahmsiddiqui/expensive/server/model"
	"github.com/saadahmsiddiqui/expensive/server/repository"
	"golang.org/x/crypto/bcrypt"
)

func CheckPassword(password string, hashedPassword []byte) bool {
	err := bcrypt.CompareHashAndPassword(hashedPassword, []byte(password))

	if err != nil {
		return false
	}

	return true
}

func AuthorizeUser(email string, password string) (string, error) {
	if repository.DbConnection == nil {
		return "", errors.New("database connection error")
	}

	db := repository.DbConnection.BunPg

	var user model.User
	err := db.NewSelect().Model(&user).Where("email = ?", email).Scan(context.Background())

	if err != nil {
		return "", errors.New("user does not exist")
	}

	isCorrectPassword := CheckPassword(password, user.Password)

	if !isCorrectPassword {
		return "", errors.New("incorrect password")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user": user.ID,
	})

	// TODO: improve secret signing
	tokenString, tokenStringErr := token.SignedString([]byte("S@adJhk123"))

	if tokenStringErr != nil {
		return "", tokenStringErr
	}

	return tokenString, nil
}
