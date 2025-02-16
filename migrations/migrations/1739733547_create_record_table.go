package migrations

import (
	"context"
	"fmt"

	"github.com/saadahmsiddiqui/expensive/server/models"
	"github.com/uptrace/bun"
)

func init() {
	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		db.NewCreateTable().Model((*models.Record)(nil)).Exec(ctx)
		fmt.Print(" [up migration] ")
		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		db.ResetModel(ctx, (*models.Record)(nil))
		fmt.Print(" [down migration] ")
		return nil
	})
}
