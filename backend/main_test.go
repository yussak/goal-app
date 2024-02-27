package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"testing"
	"time"
)

func TestMain(m *testing.M) {
	// テスト用DBへの接続初期化
	_, err := InitTestDB() // 環境変数などでテスト用DB情報を設定
	if err != nil {
		log.Fatalf("Failed to initialize test database: %v", err)
	}

	// ここで必要に応じてテストデータのセットアップを行う

	code := m.Run() // テストを実行

	// テストデータのクリーンアップやDBコンテナの停止を行う

	os.Exit(code)
}

var DB *sql.DB

// テストDBの初期化
func InitTestDB() (*sql.DB, error) {
	var err error

	user := os.Getenv("TESTDB_USERNAME")
	pwd := os.Getenv("TESTDB_PASSWORD")
	hostname := os.Getenv("TESTDB_HOSTNAME")
	dbname := os.Getenv("TESTDB_DBNAME")
	dsn := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?charset=utf8&parseTime=true", user, pwd, hostname, dbname)

	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		fmt.Println("Error opening connection:", err)
		return nil, err
	}

	// 接続リトライ（これがないとconnection refusedになることがある）
	for i := 0; i < 5; i++ {
		err = DB.Ping()
		if err == nil {
			break
		}
		log.Println("Error pinging test database: " + err.Error())
		time.Sleep(time.Second * 5)
	}

	if err != nil {
		log.Fatal("Could not connect to the test database: " + err.Error())
	}

	log.Println("Connection to the test database has been established!")
	return DB, nil
}
