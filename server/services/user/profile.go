package user

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/saadahmsiddiqui/expensive/server/model"
	"github.com/saadahmsiddiqui/expensive/server/repository"
)

func GetUserProfile(userId *uuid.UUID) (*model.User, error) {
	if repository.DbConnection != nil {
		return nil, errors.New("unable to process request")
	}

	db := repository.DbConnection.BunPg
	var user model.User

	scanErr := db.NewSelect().Model(&user).Where("id = ?", &userId).Scan(context.Background())

	if scanErr != nil {
		return nil, scanErr
	}

	return &user, nil
}
