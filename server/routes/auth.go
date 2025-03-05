package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/saadahmsiddiqui/expensive/server/controllers/auth"
)

func RegisterAuthRoutes(router *gin.Engine) {
	router.POST("/auth/register", auth.RegisterNewUser)
}
