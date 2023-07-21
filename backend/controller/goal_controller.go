package controller

import (
	"database/sql"
	"math/rand"
	"net/http"
	"time"

	"github.com/YusukeSakuraba/goal-app/internal/db"
	"github.com/YusukeSakuraba/goal-app/model"
	"github.com/gin-gonic/gin"
	"github.com/oklog/ulid"
)

func FetchGoals(c *gin.Context) {
	goals := []model.Goal{}
	
	rows, err := db.DB.Query("SELECT * FROM goals")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var goal model.Goal
		// 順番関係ありそう=>DBのcolumn順と合わせる
		err = rows.Scan(&goal.ID, &goal.Title, &goal.Text, &goal.UserID)
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
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	req.ID = id.String()
	
	// デバッグ用に残す
	// fmt.Println("dafdsa",req.UserID)

	sql := `INSERT INTO goals(id, user_id, title, text) VALUES(?, ?, ?, ?)`
	_, err = db.DB.Exec(sql, req.ID, req.UserID, req.Title, req.Text)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, req)
}

func DeleteGoal(c *gin.Context) {
	id := c.Param("id")

	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID must be provided"})
		return
	}

	_, err := db.DB.Exec("DELETE FROM goal_comments WHERE goal_id = ?", id)
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

	row := db.DB.QueryRow("SELECT id, title, text FROM goals WHERE id = ?", id)

    var goal model.Goal
    err := row.Scan(&goal.ID, &goal.Title, &goal.Text)
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

	var req model.Goal
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err = db.DB.Exec("UPDATE goals SET title = ?, text = ? WHERE id = ?", req.Title, req.Text, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	row := db.DB.QueryRow("SELECT * FROM goals WHERE id = ?", id)
	var goal model.Goal
	err = row.Scan(&goal.ID, &goal.Title, &goal.Text, &goal.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

    c.JSON(http.StatusOK, goal)
}
