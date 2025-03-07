package authentication

import (
	"context"
	"errors"
	"fmt"

	"encoding/hex"

	"github.com/google/uuid"
	"github.com/saadahmsiddiqui/expensive/server/model"
	"github.com/saadahmsiddiqui/expensive/server/repository"
	"golang.org/x/crypto/bcrypt"
)

type RegistrationDto struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Password  string `json:"password"`
	Email     string `json:"email"`
}

func HashPassword(password string) (string, error) {
	hashedPassword, hashErr := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if hashErr != nil {
		return "", hashErr
	}

	return hex.EncodeToString(hashedPassword), nil
}

func CheckPassword(password string, hashedPassword []byte) bool {
	err := bcrypt.CompareHashAndPassword(hashedPassword, []byte(password))

	if err != nil {
		return false
	}

	return true
}

func RegisterUser(registrationInfo *RegistrationDto) (*model.User, error) {

	if repository.DbConnection == nil {
		return nil, errors.New("cannot process this request")
	}

	newId, idCreationError := uuid.NewRandom()

	if idCreationError != nil {
		return nil, errors.New("cannot process this request")
	}

	db := repository.DbConnection.BunPg
	var newUser = model.User{
		FirstName: registrationInfo.FirstName,
		LastName:  registrationInfo.LastName,
		Email:     registrationInfo.Email,
		ID:        &newId,
	}

	userPassword, hashErr := HashPassword(registrationInfo.Password)

	if hashErr != nil {
		return nil, errors.New("cannot process this request")
	}

	fmt.Print("hashed password: ", userPassword)
	_, insertionError := db.NewInsert().Model(&newUser).Exec(context.Background())

	if insertionError != nil {
		return nil, errors.New("cannot process this request")
	}

	return &newUser, nil
}

func Authenticate() {}
