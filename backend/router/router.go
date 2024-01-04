package router

import (
	"github.com/YusukeSakuraba/goal-app/controller"
	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine) {

	r.GET("/api/healthcheck", controller.Healthcheck)

	r.POST("/api/auth/signup", controller.Signup)
	r.POST("/api/auth/login", controller.Login)
	r.POST("/api/auth/decodeToken", controller.DecodeToken)
	r.POST("/api/auth/logout", controller.Logout)

	r.GET("/api/:user_id/goals", controller.FetchUserGoals)

	r.POST("/api/goal", controller.AddGoal)
	r.DELETE("/api/goal/:id", controller.DeleteGoal)
	r.GET("/api/goals/:id", controller.FetchGoalDetails)
	r.PUT("/api/goals/edit/:id", controller.EditGoal)

	r.POST("/api/goals/:id/milestones", controller.AddMilestone)
	r.GET("/api/goals/:id/milestones", controller.FetchMilestones)
	r.DELETE("/api/milestones/:id", controller.DeleteMilestone)

	r.POST("/api/milestones/:id/todos", controller.AddTodo)
	r.GET("/api/milestones/:id/todos", controller.FetchTodos)
	r.DELETE("/api/todos/:id", controller.DeleteTodo)
	r.PUT("/api/todos/:id/is_completed", controller.UpdateTodoCheck)
}
