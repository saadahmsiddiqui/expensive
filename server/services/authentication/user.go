package authentication

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/saadahmsiddiqui/expensive/server/model"
	"github.com/saadahmsiddiqui/expensive/server/repository"
)

type RegistrationDto struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Password  string `json:"password"`
	Email     string `json:"email"`
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

	_, insertionError := db.NewInsert().Model(&newUser).Exec(context.Background())

	if insertionError != nil {
		return nil, errors.New("cannot process this request")
	}

	return &newUser, nil
}

func Authenticate() {}
