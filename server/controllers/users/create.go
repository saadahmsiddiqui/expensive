package users

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/saadahmsiddiqui/expensive/server/model"
	"github.com/saadahmsiddiqui/expensive/server/repository"
)

type NewUser struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
}

func CreateUser(ctx *gin.Context) {
	var newUser NewUser
	err := ctx.BindJSON(&newUser)

	if err != nil {
		ctx.IndentedJSON(
			http.StatusBadRequest,
			gin.H{"message": "Invalid message body."},
		)

		return
	}

	dbConn := repository.DbConnection

	if dbConn == nil {
		ctx.IndentedJSON(
			http.StatusInternalServerError,
			gin.H{"message": "Server cannot process this request."},
		)
		return
	}

	newId, err := uuid.NewRandom()

	if err != nil {
		fmt.Printf("Error: %s", err.Error())
	}

	db := dbConn.BunPg
	user := model.User{
		ID:        &newId,
		Email:     newUser.Email,
		FirstName: newUser.FirstName,
		LastName:  newUser.LastName,
		CreatedAt: time.Now(),
	}

	res, err := db.NewInsert().Model(&user).Exec(context.Background())

	if err != nil {
		fmt.Printf("creating entity error: %s", err.Error())
		ctx.IndentedJSON(
			http.StatusInternalServerError,
			gin.H{"message": "server cannot create a new entity"},
		)
		return
	}

	id, err := res.LastInsertId()
	fmt.Printf("Error %s", err)
	message := fmt.Sprintf("successfully created %d", id)

	ctx.IndentedJSON(http.StatusCreated, message)
}
