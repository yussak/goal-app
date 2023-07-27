package controller

import (
	"database/sql"
	"log"
	"math/rand"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/YusukeSakuraba/goal-app/internal/db"
	"github.com/YusukeSakuraba/goal-app/model"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
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
		err = rows.Scan(&goal.ID, &goal.Title, &goal.Text, &goal.UserID, &goal.ImageURL, &goal.CreatedAt, &goal.UpdatedAt)
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
		defer file.Close()

		sess := session.Must(session.NewSessionWithOptions(session.Options{
			SharedConfigState: session.SharedConfigEnable,
			Config: aws.Config{
				Region: aws.String("ap-northeast-1"),
			},
		}))

		// IAMユーザー goal-app-s3を使用する
		// AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEYを環境変数に書けば~/.aws/configなど作らなくても自動で読み込んでくれる（はず）
		// ローカルでは/configなど作る必要があるがdokcerなら環境変数として設定すればOK
		uploader := s3manager.NewUploader(sess)
		result, err := uploader.Upload(&s3manager.UploadInput{
			Bucket: aws.String("goal-app-bucket"),
			Key:    aws.String(header.Filename),
			Body:   file,
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		imageUrl := result.Location
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

	// TODO:画像追加周りがaddGoalとほぼ同じなのでいい感じに共通化する
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
		defer file.Close()

		sess := session.Must(session.NewSessionWithOptions(session.Options{
			SharedConfigState: session.SharedConfigEnable,
			Config: aws.Config{
				Region: aws.String("ap-northeast-1"),
			},
		}))

		// IAMユーザー goal-app-s3を使用する
		// AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEYを環境変数に書けば~/.aws/configなど作らなくても自動で読み込んでくれる（はず）
		// ローカルでは/configなど作る必要があるがdokcerなら環境変数として設定すればOK
		uploader := s3manager.NewUploader(sess)
		result, err := uploader.Upload(&s3manager.UploadInput{
			Bucket: aws.String("goal-app-bucket"),
			Key:    aws.String(header.Filename),
			Body:   file,
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		imageUrl := result.Location
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

	// Setup AWS session
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
		Config: aws.Config{
			Region: aws.String("ap-northeast-1"),
		},
	}))

	// Create a new S3 service client
	svc := s3.New(sess)

	// Parse the image URL to get the key
	u, err := url.Parse(imageUrl)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	key := strings.TrimPrefix(u.Path, "/")

	// Delete the image from S3
	_, err = svc.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String("goal-app-bucket"),
		Key:    aws.String(key),
	})
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
