package main

import (
	"github.com/gin-gonic/gin"

	"github.com/saadahmsiddiqui/expensive/server/routes"
)

func main() {
	r := gin.Default()
	routes.RegisterExpensesRoutes(r)
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
