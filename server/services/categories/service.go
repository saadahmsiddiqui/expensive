package categories

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"github.com/saadahmsiddiqui/expensive/server/model"
	"github.com/saadahmsiddiqui/expensive/server/repository"
)

func CreateCategory(createdBy *uuid.UUID, categoryName string) (*model.Category, error) {
	uuid, err := uuid.NewRandom()

	if err != nil {
		return nil, err
	}

	if repository.DbConnection == nil {
		return nil, errors.New("database connection unavailable")
	}

	db := repository.DbConnection.BunPg

	newCategory := model.Category{
		ID:        &uuid,
		Name:      categoryName,
		CreatedBy: createdBy,
	}

	res, err := db.NewInsert().Model(&newCategory).Exec(context.Background())
	insertedId, _ := res.LastInsertId()
	fmt.Printf("Inserted new category %d", insertedId)

	if err != nil {
		return nil, err
	}

	return &newCategory, nil
}

func GetAll() (*[]model.Category, error) {
	if repository.DbConnection == nil {
		return nil, errors.New("database connection unavailable")
	}

	var data []model.Category
	db := repository.DbConnection.BunPg

	err := db.NewSelect().Model(&data).Scan(context.Background())

	if err != nil {
		return nil, fmt.Errorf("error searching for categories: %s", err)
	}

	return &data, nil
}
