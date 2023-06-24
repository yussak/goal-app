package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() (*sql.DB, error) {
	var err error

	user := os.Getenv("DB_USERNAME")
	pwd := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_DBNAME")
	dsn := fmt.Sprintf("%s:%s@tcp(db:3306)/%s?charset=utf8", user, pwd, dbname)

	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		fmt.Println("Error opening connection:",err)
		return nil, err
	}

	err = DB.Ping()
	if err != nil {
		fmt.Println("Error pinging database:",err)
		return nil, err
	}

	fmt.Println("Connection has been established!")
	return DB, nil
}