package model

import (
	"time"

	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

type User struct {
	bun.BaseModel `bun:"table:users"`
	ID            *uuid.UUID `bun:"id,pk"`
	FirstName     string     `bun:"firstname,notnull"`
	LastName      string     `bun:"lastname,notnull"`
	Email         string     `bun:"email,notnull"`
	CreatedAt     time.Time  `bun:"createdat,default:current_timestamp"`
}
