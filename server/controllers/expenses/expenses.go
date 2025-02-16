package expenses

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type Expense struct {
	Uuid      string    `json:"id"`
	Amount    float64   `json:"amount"`
	Note      string    `json:"note"`
	CreatedBy string    `json:"createdBy"`
	CreatedOn time.Time `json:"createdOn"`
	UpdatedOn time.Time `json:"updatedOn"`
}

func NewExpense(
	uuid string,
	amount float64,
	note string,
	createdBy string,
) *Expense {
	return &Expense{
		Uuid:      uuid,
		Amount:    amount,
		Note:      note,
		CreatedBy: createdBy,
		CreatedOn: time.Now(),
		UpdatedOn: time.Now(),
	}
}

func CreateExpense(ctx *gin.Context) {

	var newExpense Expense
	err := ctx.BindJSON(&newExpense)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "error creating a new expensve"})
	}

	ctx.JSON(http.StatusCreated, &newExpense)
}
