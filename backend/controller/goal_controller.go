package controller

import (
	"database/sql"
	"fmt"
	"log"
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
		err = rows.Scan(&goal.ID, &goal.UserID, &goal.SmartSpecific, &goal.SmartMeasurable, &goal.SmartAchievable, &goal.SmartRelevant, &goal.SmartTimeBound, &goal.Purpose, &goal.Loss, &goal.Phase, &goal.Progress, &goal.CreatedAt, &goal.UpdatedAt)
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

	err = c.Request.ParseMultipartForm(10 << 20) // 10MB
	if err != nil {
		log.Printf("Error parsing form data: %s", err)
		return
	}

	// formDataを受け取る
	// fmt.Println(c.Request.PostForm)

	// Parse form values
	purpose, purposeOk := c.Request.PostForm["purpose"]
	loss, lossOk := c.Request.PostForm["loss"]
	smartSpecific, smartSpecificOk := c.Request.PostForm["smartSpecific"]
	smartMeasurable, smartMeasurableOk := c.Request.PostForm["smartMeasurable"]
	smartAchievable, smartAchievableOk := c.Request.PostForm["smartAchievable"]
	smartRelevant, smartRelevantOk := c.Request.PostForm["smartRelevant"]
	smartTimeBound, smartTimeBoundOk := c.Request.PostForm["smartTimeBound"]
	userID, userIDOk := c.Request.PostForm["user_id"]

	if !purposeOk || !lossOk || !smartSpecificOk || !smartMeasurableOk || !smartAchievableOk || !smartRelevantOk || !smartTimeBoundOk || !userIDOk {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required fields"})
		return
	}
	sql := `INSERT INTO goals(id, user_id, smart_specific, smart_measurable, smart_achievable, smart_relevant, smart_time_bound, purpose, loss, phase, progress) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	_, execErr := db.DB.Exec(sql, req.ID, userID[0], smartSpecific[0], smartMeasurable[0], smartAchievable[0], smartRelevant[0], smartTimeBound[0], purpose[0], loss[0], "予定", 0)

	if execErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
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

	row := db.DB.QueryRow("SELECT * FROM goals WHERE id = ?", id)

	var goal model.Goal
	err := row.Scan(&goal.ID, &goal.UserID, &goal.SmartSpecific, &goal.SmartMeasurable, &goal.SmartAchievable, &goal.SmartRelevant, &goal.SmartTimeBound, &goal.Purpose, &goal.Loss, &goal.Phase, &goal.Progress, &goal.CreatedAt, &goal.UpdatedAt)
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

	err := c.Request.ParseMultipartForm(10 << 20) // 10MB
	if err != nil {
		log.Printf("Error parsing form data: %s", err)
		return
	}

	purpose, purposeOk := c.Request.PostForm["purpose"]
	loss, lossOk := c.Request.PostForm["loss"]
	smartSpecific, smartSpecificOk := c.Request.PostForm["smartSpecific"]
	smartMeasurable, smartMeasurableOk := c.Request.PostForm["smartMeasurable"]
	smartAchievable, smartAchievableOk := c.Request.PostForm["smartAchievable"]
	smartRelevant, smartRelevantOk := c.Request.PostForm["smartRelevant"]
	smartTimeBound, smartTimeBoundOk := c.Request.PostForm["smartTimeBound"]

	if !purposeOk || !lossOk || !smartSpecificOk || !smartMeasurableOk || !smartAchievableOk || !smartRelevantOk || !smartTimeBoundOk {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required fields"})
		return
	}

	sql := `UPDATE goals SET smart_specific = ?, smart_measurable = ?, smart_achievable = ?, smart_relevant = ?, smart_time_bound = ?, purpose = ?, loss = ? WHERE id = ?`
	_, execErr := db.DB.Exec(sql, smartSpecific[0], smartMeasurable[0], smartAchievable[0], smartRelevant[0], smartTimeBound[0], purpose[0], loss[0], id)

	if execErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	row := db.DB.QueryRow("SELECT id, user_id, smart_specific, smart_measurable, smart_achievable, smart_relevant, smart_time_bound, purpose, loss, phase FROM goals WHERE id = ?", id)
	var goal model.Goal
	err = row.Scan(&goal.ID, &goal.UserID, &goal.SmartSpecific, &goal.SmartMeasurable, &goal.SmartAchievable, &goal.SmartRelevant, &goal.SmartTimeBound, &goal.Purpose, &goal.Loss, &goal.Phase)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, goal)
	return
}
