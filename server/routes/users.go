package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/saadahmsiddiqui/expensive/server/controllers/users"
)

func RegisterUsersRoutes(router *gin.Engine) {
	router.POST("/users", users.CreateUser)
}
