package router

import (
	"github.com/YusukeSakuraba/goal-app/controller"
	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine) {

	r.GET("/healthcheck", controller.Healthcheck)

	r.POST("/auth/user-exists", controller.UserExists)
	r.POST("/auth/signup", controller.Signup)
	r.POST("/auth/login", controller.Login)

	// todo:/users/:userId/goalsに変える
	r.GET("/:userId/goals", controller.FetchUserGoals)

	// todo:/goalsに変える
	r.POST("/goal", controller.AddGoal)
	// todo:/goals/:idに変える
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

	// todo:/reportsに変える
	r.POST("/reports", controller.AddReport)
	r.GET("/users/:userId/reports", controller.FetchReports)
	r.GET("/reports/:reportId", controller.FetchReportDetails)
	r.DELETE("/reports/:reportId", controller.DeleteReport)

}
