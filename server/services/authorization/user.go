package authorization

import (
	"context"
	"errors"

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

func AuthorizeUser(email string, password string) (*model.User, error) {
	if repository.DbConnection == nil {
		return nil, errors.New("database connection error")
	}

	db := repository.DbConnection.BunPg

	var user model.User
	err := db.NewSelect().Model(&user).Where("email = ?", email).Scan(context.Background())

	if err != nil {
		return nil, errors.New("user does not exist")
	}

	isCorrectPassword := CheckPassword(password, user.Password)

	if !isCorrectPassword {
		return nil, errors.New("incorrect password")
	}

	return &user, nil
}
