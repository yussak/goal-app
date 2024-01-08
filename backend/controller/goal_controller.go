package controller

import (
	"database/sql"
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/YusukeSakuraba/goal-app/internal/db"
	"github.com/YusukeSakuraba/goal-app/model"
	"github.com/gin-gonic/gin"
	"github.com/oklog/ulid"
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
		err = rows.Scan(&goal.ID, &goal.UserID, &goal.Content, &goal.Purpose, &goal.Loss, &goal.Phase, &goal.Progress, &goal.CreatedAt, &goal.UpdatedAt)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		goals = append(goals, goal)
	}

	c.JSON(http.StatusOK, goals)
}

func AddGoal(c *gin.Context) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)

	var req model.Goal
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	req.ID = id.String()

	sql := `INSERT INTO goals(id, user_id, content, purpose, loss, phase, progress) VALUES(?, ?, ?, ?, ?, ?, ?)`
	_, execErr := db.DB.Exec(sql, req.ID, req.UserID, req.Content, req.Purpose, req.Loss, "予定", 0)

	if execErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": execErr.Error()})
		return
	}
	c.JSON(http.StatusOK, req)
	return
}

func DeleteGoal(c *gin.Context) {
	id := c.Param("id")

	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID must be provided"})
		return
	}

	// milestone を取得
	var milestoneIDs []string
	rows, err := db.DB.Query("SELECT id FROM milestones WHERE goal_id = ?", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var milestoneID string
		if err := rows.Scan(&milestoneID); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		milestoneIDs = append(milestoneIDs, milestoneID)
	}

	// todo を削除
	for _, milestoneID := range milestoneIDs {
		_, err := db.DB.Exec("DELETE FROM todos WHERE parent_id = ?", milestoneID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	_, err = db.DB.Exec("DELETE FROM milestones WHERE goal_id = ?", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	_, err = db.DB.Exec("DELETE FROM goals WHERE id = ?", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success"})
}

func FetchGoalDetails(c *gin.Context) {
	id := c.Param("id")

	row := db.DB.QueryRow("SELECT * FROM goals WHERE id = ?", id)

	var goal model.Goal
	err := row.Scan(&goal.ID, &goal.UserID, &goal.Content, &goal.Purpose, &goal.Loss, &goal.Phase, &goal.Progress, &goal.CreatedAt, &goal.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "No goal with the provided ID."})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, goal)
}

func EditGoal(c *gin.Context) {
	id := c.Param("id")

	var params map[string]string
	if err := c.BindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
		return
	}

	missingFields := []string{}
	for _, field := range []string{"purpose", "loss", "content"} {
		if _, ok := params[field]; !ok {
			missingFields = append(missingFields, field)
		}
	}

	if len(missingFields) > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required fields", "fields": missingFields})
		return
	}

	sql := `UPDATE goals SET content = ?, purpose = ?, loss = ? WHERE id = ?`
	_, execErr := db.DB.Exec(sql, params["content"], params["purpose"], params["loss"], id)

	if execErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": execErr.Error()})
		return
	}

	row := db.DB.QueryRow("SELECT id, user_id, content, purpose, loss, phase FROM goals WHERE id = ?", id)
	var goal model.Goal
	if err := row.Scan(&goal.ID, &goal.UserID, &goal.Content, &goal.Purpose, &goal.Loss, &goal.Phase); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, goal)
	return
}
