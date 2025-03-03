package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/saadahmsiddiqui/expensive/server/controllers/categories"
)

func RegisterCategoryRoutes(router *gin.Engine) {
	router.POST("/category", categories.CreateCategory)
	router.GET("/category/:id", categories.GetById)
	router.GET("/categories", categories.GetAll)
}
