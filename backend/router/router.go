package router

import (
	"github.com/YusukeSakuraba/goal-app/controller"
	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine) {

	r.POST("auth/signup", controller.Signup)
	r.POST("auth/login", controller.Login)
	r.POST("auth/decodeToken", controller.DecodeToken)
	r.POST("auth/logout", controller.Logout)

	r.GET("/:user_id/goals", controller.FetchUserGoals)

	r.POST("/goal", controller.AddGoal)
	r.DELETE("/goal/:id", controller.DeleteGoal)
	r.GET("/goals/:id", controller.FetchGoalDetails)
	r.PUT("/goals/edit/:id", controller.EditGoal)

	r.POST("/goals/:id/comments", controller.AddGoalComment)
	r.GET("/goals/:id/comments", controller.FetchGoalComments)
	r.DELETE("/goals/:goal_id/comments/:comment_id", controller.DeleteGoalComment)
}
