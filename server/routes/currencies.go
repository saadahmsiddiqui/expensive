package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/saadahmsiddiqui/expensive/server/controllers/currencies"
)

func RegisterCurrenciesRoutes(router *gin.Engine) {
	router.POST("/currencies", currencies.CreateCurrency)
}
