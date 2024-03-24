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

func FetchUserGoals(c *gin.Context) {
	userId := c.Param("userId")
	phase := c.Query("phase")

	goals, err := fetchGoalsFromDB(userId, phase)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, goals)
}

// DBからgoalを取得。phaseクエリがある場合にはそれで絞る
func fetchGoalsFromDB(userId, phase string) ([]model.Goal, error) {
	goals := []model.Goal{}

	var rows *sql.Rows
	var err error

	if phase == "all" {
		// idに直接値を渡すのでなくプレースホルダとして渡すことでSQLインジェクションを防止している
		rows, err = db.DB.Query("SELECT * FROM goals WHERE user_id = ?", userId)
	} else {
		rows, err = db.DB.Query("SELECT * FROM goals WHERE user_id = ? AND phase = ?", userId, phase)
	}

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var goal model.Goal
		err = rows.Scan(&goal.ID, &goal.UserID, &goal.Content, &goal.Purpose, &goal.Benefit, &goal.Phase, &goal.Progress, &goal.CreatedAt, &goal.UpdatedAt)
		if err != nil {
			return nil, err
		}
		goals = append(goals, goal)
	}

	return goals, nil
}

func AddGoal(c *gin.Context) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)

	var req model.Goal
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	req.ID = id.String()
	sql := `INSERT INTO goals(id, user_id, content, purpose, benefit, phase, progress) VALUES(?, ?, ?, ?, ?, ?, ?)`
	_, execErr := db.DB.Exec(sql, req.ID, req.UserID, req.Content, req.Purpose, req.Benefit, "plan", 0)

	if execErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": execErr.Error()})
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

	// milestone を取得
	var milestoneIDs []string
	rows, err := db.DB.Query("SELECT id FROM milestones WHERE goal_id = ?", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var milestoneID string
		if err := rows.Scan(&milestoneID); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		milestoneIDs = append(milestoneIDs, milestoneID)
	}

	// todo を削除
	for _, milestoneID := range milestoneIDs {
		_, err := db.DB.Exec("DELETE FROM todos WHERE parent_id = ?", milestoneID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	_, err = db.DB.Exec("DELETE FROM milestones WHERE goal_id = ?", id)
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
	err := row.Scan(&goal.ID, &goal.UserID, &goal.Content, &goal.Purpose, &goal.Benefit, &goal.Phase, &goal.Progress, &goal.CreatedAt, &goal.UpdatedAt)
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

	var params map[string]string
	if err := c.BindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
		return
	}

	missingFields := []string{}
	for _, field := range []string{"purpose", "benefit", "content", "phase"} {
		if _, ok := params[field]; !ok {
			missingFields = append(missingFields, field)
		}
	}

	if len(missingFields) > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required fields", "fields": missingFields})
		return
	}

	sql := `UPDATE goals SET content = ?, purpose = ?, benefit = ?, phase = ? WHERE id = ?`
	_, execErr := db.DB.Exec(sql, params["content"], params["purpose"], params["benefit"], params["phase"], id)

	if execErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": execErr.Error()})
		return
	}

	row := db.DB.QueryRow("SELECT id, user_id, content, purpose, benefit, phase FROM goals WHERE id = ?", id)
	var goal model.Goal
	if err := row.Scan(&goal.ID, &goal.UserID, &goal.Content, &goal.Purpose, &goal.Benefit, &goal.Phase); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, goal)
}

// goalの個数を取得
func FetchGoalCount(c *gin.Context) {
	userId := c.Param("userId")

	var allCount, planCount, wipCount, doneCount int
	err := db.DB.QueryRow(`
        SELECT 
            COUNT(*),
			COUNT(CASE WHEN phase = 'plan' THEN 1 END) AS plan,
            COUNT(CASE WHEN phase = 'wip' THEN 1 END) AS wip,
            COUNT(CASE WHEN phase = 'done' THEN 1 END) AS done
        FROM goals 
        WHERE user_id = ?
    `, userId).Scan(&allCount, &planCount, &wipCount, &doneCount)
	// err := db.DB.QueryRow("SELECT COUNT(*) FROM goals WHERE user_id = ?", userId).Scan(&count)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// c.JSON(http.StatusOK, gin.H{"count": count})
	c.JSON(http.StatusOK, gin.H{
		"all":  allCount,
		"plan": planCount,
		"wip":  wipCount,
		"done": doneCount,
	})
}

// milestoneの個数を取得
func FetchMileCount(c *gin.Context) {
	userId := c.Param("userId")

	var count int
	err := db.DB.QueryRow("SELECT COUNT(*) FROM milestones WHERE user_id = ?", userId).Scan(&count)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"count": count})
}

// todoの個数を取得
func FetchTodoCount(c *gin.Context) {
	userId := c.Param("userId")

	var count int
	err := db.DB.QueryRow("SELECT COUNT(*) FROM todos WHERE user_id = ?", userId).Scan(&count)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"count": count})
}
