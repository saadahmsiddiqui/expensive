package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/saadahmsiddiqui/expensive/server/services/authentication"
)

func RegisterNewUser(ctx *gin.Context) {

	var data authentication.RegistrationDto
	bindErr := ctx.BindJSON(&data)

	if bindErr != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "bad request, please check payload"})
		return
	}

	newUser, newUserError := authentication.RegisterUser(&data)

	if newUserError != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "unable to register user"})
		return
	}

	ctx.JSON(http.StatusOK, newUser)
}
