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

func FetchMilestones(c *gin.Context) {
	milestones := []model.Milestone{}
	goal_id := c.Param("id")

	rows, err := db.DB.Query("SELECT id, user_id, goal_id, content FROM milestones WHERE goal_id = ?", goal_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var milestone model.Milestone
		err = rows.Scan(&milestone.ID, &milestone.UserID, &milestone.GoalID, &milestone.Content)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		milestones = append(milestones, milestone)
	}

	c.JSON(http.StatusOK, milestones)
}

func AddMilestone(c *gin.Context) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)

	var req model.Milestone
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	req.ID = id.String()
	req.GoalID = c.Param("id")

	sql := `INSERT INTO milestones(id, user_id, goal_id, content) VALUES(?, ?, ?, ?)`
	_, err = db.DB.Exec(sql, req.ID, req.UserID, req.GoalID, req.Content)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, req)
}

func DeleteMilestone(c *gin.Context) {
	milestone_id := c.Param("milestone_id")

	if milestone_id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID must be provided"})
		return
	}

	// todosも削除する。先に子を削除する必要がある
	_, err := db.DB.Exec("DELETE FROM todos WHERE parent_id = ?", milestone_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	_, err = db.DB.Exec("DELETE FROM milestones WHERE id = ?", milestone_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success"})
}
