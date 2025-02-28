package main

import (
	"github.com/gin-gonic/gin"

	"github.com/saadahmsiddiqui/expensive/server/repository"
	"github.com/saadahmsiddiqui/expensive/server/routes"
)

func main() {
	repository.ConnectDB()
	r := gin.Default()
	routes.RegisterExpensesRoutes(r)
	routes.RegisterCurrenciesRoutes(r)
	routes.RegisterUsersRoutes(r)
	routes.RegisterCategoryRoutes(r)
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
