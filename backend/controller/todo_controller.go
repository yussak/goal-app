package controller

import (
	"math/rand"
	"net/http"
	"time"

	"github.com/YusukeSakuraba/goal-app/internal/db"
	"github.com/YusukeSakuraba/goal-app/model"
	"github.com/gin-gonic/gin"
	"github.com/oklog/ulid"
)

func FetchTodos(c *gin.Context) {
	todos := []model.Todo{}
	parentId := c.Param("id")

	rows, err := db.DB.Query("SELECT id, content, is_completed FROM todos WHERE parent_id = ?", parentId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var todo model.Todo
		err = rows.Scan(&todo.ID, &todo.Content, &todo.IsCompleted)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		todos = append(todos, todo)
	}

	c.JSON(http.StatusOK, todos)
}

func AddTodo(c *gin.Context) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)

	var req model.Todo
	err := c.Bind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	req.ID = id.String()
	req.ParentID = c.Param("id")

	sql := `INSERT INTO todos(id, parent_id, user_id, content, is_completed) VALUES(?, ?, ?, ?, ?)`
	_, err = db.DB.Exec(sql, req.ID, req.ParentID, req.UserID, req.Content, false)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, req)
}

func DeleteTodo(c *gin.Context) {
	id := c.Param("id")

	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID must be provided"})
		return
	}

	_, err := db.DB.Exec("DELETE FROM todos WHERE id = ?", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success"})
}

func UpdateTodoCheck(c *gin.Context) {
	id := c.Param("id")

	var todo model.Todo
	if err := c.BindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// データベースを更新
	_, err := db.DB.Exec("UPDATE todos SET is_completed = ? WHERE id = ?", todo.IsCompleted, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 更新されたToDoを取得
	err = db.DB.QueryRow("SELECT * FROM todos WHERE id = ?", id).Scan(&todo.ID, &todo.ParentID, &todo.UserID, &todo.Content, &todo.IsCompleted, &todo.CreatedAt, &todo.UpdatedAt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, todo)
}
