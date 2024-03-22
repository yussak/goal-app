package router

import (
	"github.com/YusukeSakuraba/goal-app/controller"
	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine) {

	r.GET("/healthcheck", controller.Healthcheck)

	r.POST("/auth/signup", controller.Signup)
	r.POST("/auth/login", controller.Login)
	r.POST("/auth/decodeToken", controller.DecodeToken)
	r.POST("/auth/logout", controller.Logout)

	r.GET("/:userId/goals", controller.FetchUserGoals)

	r.POST("/goal", controller.AddGoal)
	r.DELETE("/goal/:id", controller.DeleteGoal)
	r.GET("/goals/:id", controller.FetchGoalDetails)
	r.PUT("/goals/edit/:id", controller.EditGoal)

	r.POST("/goals/:id/milestones", controller.AddMilestone)
	r.GET("/goals/:id/milestones", controller.FetchMilestones)
	r.DELETE("/milestones/:id", controller.DeleteMilestone)

	r.POST("/milestones/:id/todos", controller.AddTodo)
	r.GET("/milestones/:id/todos", controller.FetchTodos)
	r.DELETE("/todos/:id", controller.DeleteTodo)
	r.PUT("/todos/:id/isCompleted", controller.UpdateTodoCheck)

	r.POST("/report", controller.AddReport)
	r.GET("/reports/:userId", controller.FetchReports)

}
