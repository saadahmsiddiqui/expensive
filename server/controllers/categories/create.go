package categories

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/saadahmsiddiqui/expensive/server/services/categories"
)

type CreateCategoryDto struct {
	CreatedBy string `json:"createdBy"`
	Name      string `json:"categoryName"`
}

func CreateCategory(ctx *gin.Context) {
	var data CreateCategoryDto
	err := ctx.BindJSON(&data)

	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": fmt.Errorf("error creating a category %s", err)},
		)

		return
	}

	parsedUuid, parseErr := uuid.Parse(data.CreatedBy)

	if parseErr != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": fmt.Errorf("error creating a category %s", err)},
		)

		return
	}

	createdCategory, createErr := categories.CreateCategory(&parsedUuid, data.Name)

	if createErr != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": fmt.Errorf("error creating a category %s", createErr)},
		)

		return
	}

	ctx.JSON(http.StatusOK, &createdCategory)
}
