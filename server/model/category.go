package model

import (
	"time"

	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

type Category struct {
	bun.BaseModel `bun:"table:categories"`
	ID            *uuid.UUID `bun:"id,pk"`
	Name          string     `bun:"categoryname,notnull"`
	CreatedAt     time.Time  `bun:"createdat,default:current_timestamp"`
	CreatedBy     *uuid.UUID `bun:"createdby,notnull"`
	Creator       *User      `bun:"rel:belongs-to,join:createdby=id"`
}
