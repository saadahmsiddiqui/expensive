package categories

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/saadahmsiddiqui/expensive/server/services/categories"
)

func GetAll(ctx *gin.Context) {
	list, err := categories.GetAll()

	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": fmt.Errorf("%s", err)},
		)

		return
	}

	ctx.JSON(http.StatusOK, list)
}

func GetById(ctx *gin.Context) {
	id, errParseId := uuid.Parse(ctx.Param("id"))

	if errParseId != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": "unable to parse id " + errParseId.Error()},
		)

		return
	}

	data, errGetById := categories.GetById(&id)

	if errGetById != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "unable to find category with id " + id.String()})
		return
	}

	ctx.JSON(http.StatusOK, data)
}
