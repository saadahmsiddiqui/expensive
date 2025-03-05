package users

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/saadahmsiddiqui/expensive/server/services/user"
)

func GetProfile(ctx *gin.Context) {

	userIdStr := ctx.Param("id")

	parsedId, parseIdError := uuid.Parse(userIdStr)

	if parseIdError != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": "invalid user id " + userIdStr},
		)
		return
	}

	user, userGetErr := user.GetUserProfile(&parsedId)

	if userGetErr != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"message": "unable to find user"},
		)
		return
	}

	ctx.JSON(http.StatusOK, user)

}
