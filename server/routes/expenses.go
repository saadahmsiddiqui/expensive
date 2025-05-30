package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/saadahmsiddiqui/expensive/server/controllers/expenses"
)

func RegisterExpensesRoutes(router *gin.Engine) {
	router.POST("/expense", expenses.CreateExpense)
}
