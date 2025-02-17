package repository

import (
	"database/sql"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

type DatabaseConnection struct {
	BunPg *bun.DB
}

var DbConnection *DatabaseConnection

func ConnectDB() *bun.DB {
	if DbConnection != nil {
		return DbConnection.BunPg
	}

	dsn := "postgres://postgres:expensive@localhost:5432/expensive?sslmode=disable"
	// dsn := "unix://user:pass@dbname/var/run/postgresql/.s.PGSQL.5432"
	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))

	db := bun.NewDB(sqldb, pgdialect.New())

	DbConnection = &DatabaseConnection{
		db,
	}

	return DbConnection.BunPg
}
