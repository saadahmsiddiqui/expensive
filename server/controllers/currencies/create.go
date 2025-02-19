package currencies

import (
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/saadahmsiddiqui/expensive/server/model"
	"github.com/saadahmsiddiqui/expensive/server/repository"
)

type CreateCurrencyDto struct {
	Name      string `json:"name"`
	CreatedBy string `json:"createdBy"`
	Symbol    string `json:"symbol"`
}

func CreateCurrency(ctx *gin.Context) {
	var newCurrency CreateCurrencyDto
	err := ctx.BindJSON(newCurrency)

	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": "Invalid payload or request"},
		)
	}

	if repository.DbConnection == nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "Unable to serve request at this time"},
		)
	}

	createdBy, err := uuid.Parse(newCurrency.CreatedBy)

	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "Unable to serve request at this time"},
		)
	}

	newId, err := uuid.NewRandom()

	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "Unable to serve request at this time"},
		)
	}

	currency := model.Currency{
		ID:           &newId,
		CurrencyName: newCurrency.Name,
		CreatedBy:    &createdBy,
		Symbol:       newCurrency.Symbol,
	}

	db := repository.DbConnection.BunPg
	res, err := db.NewInsert().Model(&currency).Exec(context.Background())

	if err != nil {
		fmt.Printf("creating entity error: %s", err.Error())
		ctx.IndentedJSON(
			http.StatusInternalServerError,
			gin.H{"message": "server cannot create a new entity"},
		)
		return
	}

	id, err := res.LastInsertId()
	fmt.Printf("Error %s", err)
	message := fmt.Sprintf("successfully created %d", id)

	ctx.IndentedJSON(http.StatusCreated, message)
}
