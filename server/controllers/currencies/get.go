package currencies

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/saadahmsiddiqui/expensive/server/services/currencies"
)

func GetById(ctx *gin.Context) {
	idStr, ok := ctx.Params.Get("id")

	if !ok {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": "param required but not found"},
		)
		return
	}

	currId, parseErr := uuid.Parse(idStr)

	if parseErr != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": "invalid uuid"},
		)
		return
	}

	curr, findErr := currencies.GetCurrency(&currId)

	if findErr != nil {
		ctx.JSON(
			http.StatusNotFound,
			gin.H{"message": findErr.Error()},
		)
		return
	}

	ctx.JSON(
		http.StatusOK,
		curr,
	)

}

func GetAll(ctx *gin.Context) {

	list, err := currencies.GetCurrencies()

	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": fmt.Errorf("%s", err)},
		)

		return
	}

	ctx.JSON(http.StatusOK, list)
}

func GetUserCurrencies(ctx *gin.Context) {
	userIdstr := ctx.Param("id")
	parsedId, parseIdErr := uuid.Parse(userIdstr)

	if parseIdErr != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": "unable to parse user id " + userIdstr},
		)

		return
	}

	userCurrencies, retirevalErr := currencies.GetUserCurrencies(&parsedId)

	if retirevalErr != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "unable to retrieve data, please try again later"},
		)

		return
	}

	ctx.JSON(http.StatusOK, userCurrencies)
}
