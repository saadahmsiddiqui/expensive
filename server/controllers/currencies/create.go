package currencies

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/saadahmsiddiqui/expensive/server/services/currencies"
)

type CreateCurrencyDto struct {
	Name      string `json:"name"`
	CreatedBy string `json:"createdBy"`
	Symbol    string `json:"symbol"`
}

func CreateCurrency(ctx *gin.Context) {
	var newCurrency CreateCurrencyDto
	err := ctx.BindJSON(&newCurrency)

	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": "Invalid payload or request"},
		)

		return
	}

	createdBy, err := uuid.Parse(newCurrency.CreatedBy)

	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "Unable to serve request at this time"},
		)
		return
	}

	currency, err := currencies.CreateCurrency(newCurrency.Name, &createdBy, newCurrency.Symbol)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"message": "Unable to serve request at this time"},
		)

		return
	}

	ctx.IndentedJSON(http.StatusCreated, currency)
}
