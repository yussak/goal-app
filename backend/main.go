package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/YusukeSakuraba/goal-app/internal/db"
	"github.com/YusukeSakuraba/goal-app/middleware"
	"github.com/YusukeSakuraba/goal-app/router"
)

func main() {
	// 不具合防止のため明示的に呼び出す
	_, err := db.InitDB()
	if err != nil {
		log.Fatalf("Error initializing database: %v", err)
	}

	r := gin.Default()

	r.Use(cors.New(middleware.GetCorsConfig()))

	router.SetupRouter(r)

	r.Run(":5000")
}
