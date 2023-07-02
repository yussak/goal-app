package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

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

	// 接続リトライ（これがないとconnection refusedになることがある）
	for i := 0; i < 5; i++ {
		err = DB.Ping()
		if err == nil {
			break
		}
		log.Println("Error pinging database: " + err.Error())
		time.Sleep(time.Second * 5)
	}

	if err != nil {
		log.Fatal("Could not connect to the database: " + err.Error())
	}

	log.Println("Connection has been established!")
	return DB, nil
}