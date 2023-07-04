package controller

import (
	"math/rand"
	"net/http"
	"time"

	"github.com/YusukeSakuraba/goal-app/internal/db"
	"github.com/YusukeSakuraba/goal-app/model"
	"github.com/gin-gonic/gin"
	"github.com/oklog/ulid"
)

func FetchGoalComments(c *gin.Context) {
	goal_comments := []model.GoalComment{}
	goal_id := c.Param("id")
	
	rows, err := db.DB.Query("SELECT id, goal_id, title, text FROM goal_comments WHERE goal_id = ?", goal_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var goal_comment model.GoalComment
		err = rows.Scan(&goal_comment.ID, &goal_comment.GoalID, &goal_comment.Title, &goal_comment.Text)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		goal_comments = append(goal_comments, goal_comment)
	}

	c.JSON(http.StatusOK, goal_comments)
}

func AddGoalComment(c *gin.Context) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)

	var req model.GoalComment
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	req.ID = id.String()
	req.GoalID = c.Param("id")

	sql := `INSERT INTO goal_comments(id, goal_id, title, text) VALUES(?, ?, ?, ?)`
	_, err = db.DB.Exec(sql, req.ID, req.GoalID, req.Title, req.Text)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, req)
}
