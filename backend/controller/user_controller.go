package controller

import (
	"fmt"
	"net/http"

	"github.com/YusukeSakuraba/goal-app/internal/db"
	"github.com/YusukeSakuraba/goal-app/model"
	"github.com/gin-gonic/gin"
)

func FetchUserGoals(c *gin.Context) {

	user_id := c.Param("user_id")
	fmt.Println("c.Param", c.Param("user_id"))

	goals := []model.Goal{}

	rows, err := db.DB.Query("SELECT * FROM goals WHERE user_id = ?", user_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var goal model.Goal
		err = rows.Scan(&goal.ID, &goal.Title, &goal.Text, &goal.UserID, &goal.ImageURL, &goal.CreatedAt, &goal.UpdatedAt)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		goals = append(goals, goal)
	}

	c.JSON(http.StatusOK, goals)
}
