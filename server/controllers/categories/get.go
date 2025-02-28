package categories

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
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
