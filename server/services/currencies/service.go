package currencies

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"github.com/saadahmsiddiqui/expensive/server/model"
	"github.com/saadahmsiddiqui/expensive/server/repository"
)

func CreateCurrency(
	currencyName string,
	createdBy *uuid.UUID,
	symbol string,
) (*model.Currency, error) {

	newId, uuidErr := uuid.NewRandom()

	if uuidErr != nil {
		return nil, errors.New("unable to create a new id for record")
	}

	currency := model.Currency{
		ID:           &newId,
		CurrencyName: currencyName,
		CreatedBy:    createdBy,
		Symbol:       symbol,
	}

	if repository.DbConnection == nil {
		return nil, errors.New("unable to connect to database")
	}

	db := repository.DbConnection.BunPg
	_, err := db.NewInsert().Model(&currency).Exec(context.Background())
	if err != nil {
		return nil, errors.New("unable to create a new record, insert error")
	}

	return &currency, nil
}

func GetCurrency(currencyId *uuid.UUID) (*model.Currency, error) {
	if repository.DbConnection == nil {
		return nil, errors.New("unable to connect to database")
	}

	var curr model.Currency
	db := repository.DbConnection.BunPg
	err := db.NewSelect().Model(&curr).Where("id = ?", &currencyId).Scan(context.Background())

	if err != nil {
		return nil, fmt.Errorf("currency with id: %s not found", currencyId.String())
	}

	return &curr, nil
}

func GetCurrencies() (*[]model.Currency, error) {
	if repository.DbConnection == nil {
		return nil, errors.New("unable to connect to database")
	}

	var curr []model.Currency
	db := repository.DbConnection.BunPg
	err := db.NewSelect().Model(&curr).Scan(context.Background())

	if err != nil {
		return nil, fmt.Errorf("unable to retrieve currencies %s", err)
	}

	return &curr, nil
}
