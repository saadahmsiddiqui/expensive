package authentication

import (
	"context"
	"errors"

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

func HashPassword(password string) ([]byte, error) {
	hashedPassword, hashErr := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if hashErr != nil {
		return nil, hashErr
	}

	return hashedPassword, nil
}

func RegisterUser(registrationInfo *RegistrationDto) (*model.User, error) {

	if repository.DbConnection == nil {
		return nil, errors.New("cannot process this request")
	}

	newId, idCreationError := uuid.NewRandom()

	if idCreationError != nil {
		return nil, errors.New("cannot process this request")
	}

	userPassword, hashErr := HashPassword(registrationInfo.Password)

	db := repository.DbConnection.BunPg
	var newUser = model.User{
		FirstName: registrationInfo.FirstName,
		LastName:  registrationInfo.LastName,
		Email:     registrationInfo.Email,
		ID:        &newId,
		Password:  userPassword,
	}

	if hashErr != nil {
		return nil, errors.New("cannot process this request")
	}

	_, insertionError := db.NewInsert().Model(&newUser).Exec(context.Background())

	if insertionError != nil {
		return nil, errors.New("cannot process this request")
	}

	newUser.Password = nil

	return &newUser, nil
}
