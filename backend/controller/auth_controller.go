package controller

import (
	"database/sql"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/YusukeSakuraba/goal-app/internal/db"
	"github.com/YusukeSakuraba/goal-app/model"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/oklog/ulid"
	"golang.org/x/crypto/bcrypt"
)

// userが存在しているか判定
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

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	user.ID = ulid.MustNew(ulid.Timestamp(t), entropy).String()

	_, err = db.DB.Exec("INSERT INTO users(id, name, email, password) VALUES(?, ?, ?, ?)", user.ID, user.Name, user.Email, string(hashedPassword))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User successfully created"})
}

func Login(c *gin.Context) {
	var user model.User
	var dbUser model.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	row := db.DB.QueryRow("SELECT * FROM users WHERE email =?", user.Email)

	err := row.Scan(&dbUser.ID, &dbUser.Name, &dbUser.Email, &dbUser.Password)
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

	err = bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password))
	if err != nil {
		// If the password does not match
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Password is incorrect"})
		return
	}

	// The user is authenticated, add your code here
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    dbUser.ID,
		"name":  dbUser.Name,
		"email": dbUser.Email,
		// You can also add the expiration time of the token here
	})

	// Replace 'your-secret' with your own secret key
	mySecret := os.Getenv("MY_SECRET")
	tokenString, err := token.SignedString([]byte(mySecret))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating the token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User authenticated successfully",
		"user": gin.H{
			"id":    dbUser.ID,
			"name":  dbUser.Name,
			"email": dbUser.Email,
		},
		"token": tokenString,
	})
}
