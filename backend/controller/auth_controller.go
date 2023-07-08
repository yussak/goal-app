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
	"golang.org/x/crypto/bcrypt"
)

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
	user.ID = ulid.MustNew(ulid.Timestamp(t),entropy).String()
	
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
    c.JSON(http.StatusOK, gin.H{"message": "User authenticated successfully"})
}