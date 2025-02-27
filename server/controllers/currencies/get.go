package currencies

import (
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
