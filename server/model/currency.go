package model

import (
	"time"

	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

type Currency struct {
	bun.BaseModel `bun:"table:currencies"`
	ID            *uuid.UUID `bun:"id,pk"`
	CurrencyName  string     `bun:"currencyname,notnull"`
	Symbol        string     `bun:"symbol,lastname,notnull"`
	CreatedAt     time.Time  `bun:"createdat,default:current_timestamp"`
	CreatedBy     *uuid.UUID `bun:"createdby,notnull"`
	Creator       *User      `bun:"rel:belongs-to,join:createdby=id"`
}
