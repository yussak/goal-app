package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/YusukeSakuraba/goal-app/controller"
	"github.com/YusukeSakuraba/goal-app/internal/db"
)

func main() {
	// 不具合防止のため明示的に呼び出す
	_, err := db.InitDB()
	if err != nil {
		log.Fatalf("Error initializing database: %v", err)
	}

	r := gin.Default()

	r.Use(corsMiddleware())
	
	r.POST("auth/signup", controller.Signup)
	r.POST("auth/login", controller.Login)

	r.GET("/users", controller.FetchUsers)
	r.GET("/users/:id", controller.FetchUserDetails)

	r.POST("/goal", controller.AddGoal)
	r.GET("/goals", controller.FetchGoals)
	r.DELETE("/goal/:id", controller.DeleteGoal)
	r.GET("/goals/:id", controller.FetchGoalDetails)
	
	r.POST("/goals/:id/comments", controller.AddGoalComment)
	r.GET("/goals/:id/comments", controller.FetchGoalComments)
	r.DELETE("/goals/:goal_id/comments/:comment_id", controller.DeleteGoalComment)

	r.Run(":8080")
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Content-Type", "application/json")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	}
}