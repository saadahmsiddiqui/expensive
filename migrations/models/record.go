package models

import (
	"time"

	"github.com/google/uuid"
)

type Record struct {
	ID        uuid.UUID `bun:"type:uuid,default:uuid_generate_v4(),pk"`
	Amount    float64
	Note      string
	CreatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp"`
	UpdatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp"`
}
