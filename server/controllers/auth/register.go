package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/saadahmsiddiqui/expensive/server/services/authentication"
	"github.com/saadahmsiddiqui/expensive/server/services/authorization"
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

type LoginDto struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func LoginUser(ctx *gin.Context) {

	var loginData LoginDto

	bindErr := ctx.BindJSON(&loginData)

	if bindErr != nil {

		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"message": bindErr.Error()},
		)
		return
	}

	authorizedUser, authorizationErr := authorization.AuthorizeUser(loginData.Email, loginData.Password)

	if authorizationErr != nil {
		ctx.JSON(http.StatusForbidden, gin.H{"message": authorizationErr.Error()})
		return
	}

	ctx.JSON(http.StatusOK, authorizedUser)
}
