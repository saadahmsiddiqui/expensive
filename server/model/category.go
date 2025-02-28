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
	ParentId      *uuid.UUID `bun:"parent,"`
	Creator       *User      `bun:"rel:belongs-to,join:createdby=id"`
	Parent        *Category  `bun:"rel:belongs-to,join:parent=id"`
}
