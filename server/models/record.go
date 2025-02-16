package models

import "github.com/google/uuid"

type Record struct {
	ID     uuid.UUID `bun:"type:uuid,default:uuid_generate_v4()"`
	amount float64
	note   string
}
