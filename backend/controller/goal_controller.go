package controller

import (
	"database/sql"
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
	title, titleOk := c.Request.PostForm["title"]
	text, textOk := c.Request.PostForm["text"]
	userID, userIDOk := c.Request.PostForm["user_id"]

	if !titleOk || !textOk || !userIDOk {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required fields"})
		return
	}

	file, header, err := c.Request.FormFile("image")
	if err != nil {
		sql := `INSERT INTO goals(id, title, text, user_id, image_url) VALUES(?, ?, ?, ?, NULL)`
		_, execErr := db.DB.Exec(sql, req.ID, title[0], text[0], userID[0])

		if execErr != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, req)
		return
	} else {
		imageUrl, err := utils.UploadToS3(file, header)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		sql := `INSERT INTO goals(id, title, text, user_id, image_url) VALUES(?, ?, ?, ?, ?)`
		_, err = db.DB.Exec(sql, req.ID, title[0], text[0], userID[0], imageUrl)

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
	err := row.Scan(&goal.ID, &goal.Title, &goal.Text, &goal.UserID, &goal.ImageURL, &goal.CreatedAt, &goal.UpdatedAt)
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

	// Parse form values
	title, titleOk := c.Request.PostForm["title"]
	text, textOk := c.Request.PostForm["text"]

	if !titleOk || !textOk {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required fields"})
		return
	}
	file, header, err := c.Request.FormFile("image")
	if err != nil {
		sql := `UPDATE goals SET title = ?, text = ? WHERE id = ?`
		_, execErr := db.DB.Exec(sql, title[0], text[0], id)

		if execErr != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		row := db.DB.QueryRow("SELECT * FROM goals WHERE id = ?", id)
		var goal model.Goal
		err = row.Scan(&goal.ID, &goal.Title, &goal.Text, &goal.UserID, &goal.ImageURL, &goal.CreatedAt, &goal.UpdatedAt)
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

		sql := `UPDATE goals SET title = ?, text = ?, image_url = ?`
		_, err = db.DB.Exec(sql, title[0], text[0], imageUrl)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		row := db.DB.QueryRow("SELECT * FROM goals WHERE id = ?", id)
		var goal model.Goal
		err = row.Scan(&goal.ID, &goal.Title, &goal.Text, &goal.UserID, &goal.ImageURL, &goal.CreatedAt, &goal.UpdatedAt)
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
