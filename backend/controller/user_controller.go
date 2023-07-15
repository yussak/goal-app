package controller

import (
	"database/sql"
	"net/http"

	"github.com/YusukeSakuraba/goal-app/internal/db"
	"github.com/YusukeSakuraba/goal-app/model"
	"github.com/gin-gonic/gin"
)

func FetchUsers(c *gin.Context) {
	users := []model.User{}
	
	rows, err := db.DB.Query("SELECT id, name FROM users")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var user model.User
		err = rows.Scan(&user.ID, &user.Name)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		users = append(users, user)
	}

	c.JSON(http.StatusOK, users)
}

func FetchUserDetails(c *gin.Context) {
	id := c.Param("id")

	row := db.DB.QueryRow("SELECT id, name FROM Users WHERE id = ?", id)

    var User model.User
    err := row.Scan(&User.ID, &User.Name)
    if err != nil {
        if err == sql.ErrNoRows {
            c.JSON(http.StatusNotFound, gin.H{"error": "No User with the provided ID."})
            return
        }

        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, User)
}