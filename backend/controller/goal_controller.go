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
	"github.com/YusukeSakuraba/goal-app/utils"
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
		err = rows.Scan(&goal.ID, &goal.UserID, &goal.ImageURL, &goal.CreatedAt, &goal.UpdatedAt, &goal.Specific, &goal.Measurable, &goal.Achievable, &goal.Relevant, &goal.TimeBound, &goal.Purpose, &goal.Loss, &goal.Phase, &goal.Progress)
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
	Specific, SpecificOk := c.Request.PostForm["specific"]
	Measurable, MeasurableOk := c.Request.PostForm["measurable"]
	Achievable, AchievableOk := c.Request.PostForm["achievable"]
	Relevant, RelevantOk := c.Request.PostForm["relevant"]
	TimeBound, TimeBoundOk := c.Request.PostForm["timeBound"]
	userID, userIDOk := c.Request.PostForm["user_id"]

	if !purposeOk || !lossOk || !SpecificOk || !MeasurableOk || !AchievableOk || !RelevantOk || !TimeBoundOk || !userIDOk {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required fields"})
		return
	}

	file, header, err := c.Request.FormFile("image")
	if err != nil {
		sql := `INSERT INTO goals(id, user_id, specific, measurable, achievable, relevant, time_bound, purpose, loss) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`
		_, execErr := db.DB.Exec(sql, req.ID, userID[0], Specific[0], Measurable[0], Achievable[0], Relevant[0], TimeBound[0], purpose[0], loss[0])

		if execErr != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"eeeerror": err.Error()})
			return
		}
		c.JSON(http.StatusOK, req)
		return
	} else {
		imageUrl, err := utils.UploadToS3(file, header)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"erroｇｇr": err.Error()})
			return
		}

		sql := `INSERT INTO goals(id, user_id, image_url, specific, measurable, achievable, relevant, time_bound, purpose, loss, phase, progress) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
		_, err = db.DB.Exec(sql, req.ID, userID[0], imageUrl, Specific[0], Measurable[0], Achievable[0], Relevant[0], TimeBound[0], purpose[0], loss[0], "予定", 0)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		req.ImageURL = &imageUrl
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

	row := db.DB.QueryRow("SELECT * FROM goals WHERE id = ?", id)

	var goal model.Goal
	err := row.Scan(&goal.ID, &goal.UserID, &goal.ImageURL, &goal.CreatedAt, &goal.UpdatedAt, &goal.Specific, &goal.Measurable, &goal.Achievable, &goal.Relevant, &goal.TimeBound, &goal.Purpose, &goal.Loss, &goal.Phase, &goal.Progress)
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
	Specific, SpecificOk := c.Request.PostForm["Specific"]
	Measurable, MeasurableOk := c.Request.PostForm["Measurable"]
	Achievable, AchievableOk := c.Request.PostForm["Achievable"]
	Relevant, RelevantOk := c.Request.PostForm["Relevant"]
	TimeBound, TimeBoundOk := c.Request.PostForm["TimeBound"]

	if !purposeOk || !lossOk || !SpecificOk || !MeasurableOk || !AchievableOk || !RelevantOk || !TimeBoundOk {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required fields"})
		return
	}
	file, header, err := c.Request.FormFile("image")
	if err != nil {
		sql := `UPDATE goals SET specific = ?, measurable = ?, achievable = ?, relevant = ?, time_bound = ?, purpose = ?, loss = ? WHERE id = ?`
		_, execErr := db.DB.Exec(sql, Specific[0], Measurable[0], Achievable[0], Relevant[0], TimeBound[0], purpose[0], loss[0], id)

		if execErr != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"erroaar": err.Error()})
			return
		}

		row := db.DB.QueryRow("SELECT id, user_id, specific, measurable, achievable, relevant, time_bound, purpose, loss, phase FROM goals WHERE id = ?", id)
		var goal model.Goal
		err = row.Scan(&goal.ID, &goal.UserID, &goal.Specific, &goal.Measurable, &goal.Achievable, &goal.Relevant, &goal.TimeBound, &goal.Purpose, &goal.Loss, &goal.Phase)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, goal)
		return
	} else {
		imageUrl, err := utils.UploadToS3(file, header)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		sql := `UPDATE goals SET image_url = ?, specific = ?, measurable = ?, achievable = ?, relevant = ?, time_bound = ?, purpose = ?, loss = ? WHERE id = ?`
		_, err = db.DB.Exec(sql, imageUrl, Specific[0], Measurable[0], Achievable[0], Relevant[0], TimeBound[0], purpose[0], loss[0], id)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		row := db.DB.QueryRow("SELECT * FROM goals WHERE id = ?", id)
		var goal model.Goal
		err = row.Scan(&goal.ID, &goal.UserID, &goal.ImageURL, &goal.CreatedAt, &goal.UpdatedAt, &goal.Specific, &goal.Measurable, &goal.Achievable, &goal.Relevant, &goal.TimeBound, &goal.Purpose, &goal.Loss, &goal.Phase, &goal.Progress)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, goal)
	}
}

func DeleteGoalImage(c *gin.Context) {
	id := c.Param("id")

	// Get the current image_url for this goal
	row := db.DB.QueryRow("SELECT image_url FROM goals WHERE id = ?", id)
	var imageUrl string
	err := row.Scan(&imageUrl)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = utils.DeleteFromS3(imageUrl)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Delete the image URL from the database
	sql := `UPDATE goals SET image_url = NULL WHERE id = ?`
	_, execErr := db.DB.Exec(sql, id)

	if execErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": execErr.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Image deleted successfully"})
}
