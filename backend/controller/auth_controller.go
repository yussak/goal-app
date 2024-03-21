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

// userが存在しているか判定
// todo:これfunc Loginでuserあるか判定してる気がするがそれ使えないか確認
func UserExists(c *gin.Context) {
	var user model.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var count int
	err := db.DB.QueryRow("SELECT COUNT(*) FROM users WHERE email = ?", user.Email).Scan(&count)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	exists := count > 0
	c.JSON(http.StatusOK, gin.H{"exists": exists})
}

func Signup(c *gin.Context) {
	var user model.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	user.ID = ulid.MustNew(ulid.Timestamp(t), entropy).String()

	_, err := db.DB.Exec("INSERT INTO users(id, name, email) VALUES(?, ?, ?)", user.ID, user.Name, user.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User successfully created"})
}

func Login(c *gin.Context) {
	var user model.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var dbUser model.User
	row := db.DB.QueryRow("SELECT * FROM users WHERE email =?", user.Email)

	err := row.Scan(&dbUser.ID, &dbUser.Name, &dbUser.Email)
	// todo:早期リターン
	if err != nil {
		if err == sql.ErrNoRows {
			// If the email does not exist
			c.JSON(http.StatusUnauthorized, gin.H{"message": "No user found with this email"})
			return
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User authenticated successfully",
		"user": gin.H{
			"id":    dbUser.ID,
			"name":  dbUser.Name,
			"email": dbUser.Email,
		},
	})
}
