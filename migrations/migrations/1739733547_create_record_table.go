package migrations

import (
	"context"
	"fmt"

	"github.com/saadahmsiddiqui/expensive/migrations/models"
	"github.com/uptrace/bun"
)

func init() {
	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		_, err := db.NewCreateTable().Model((*models.Record)(nil)).Exec(ctx)
		fmt.Printf(" [up migration] %s", err)
		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		_, err := db.NewDropTable().Model((*models.Record)(nil)).Exec(ctx)
		fmt.Printf(" [down migration] %s", err)
		return nil
	})
}
