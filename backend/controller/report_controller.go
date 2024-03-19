package controller

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/YusukeSakuraba/goal-app/internal/db"
	"github.com/YusukeSakuraba/goal-app/model"
	"github.com/gin-gonic/gin"
	"github.com/oklog/ulid"
)

func AddReport(c *gin.Context) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)

	var req model.DailyReport
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	req.ID = id.String()

	// todo:report_dateには年月日まで追加すればいいと思うので追加（createdAtなどは時間までありそう）

	req.ReportDate = time.Date(time.Now().Year(), time.Now().Month(), time.Now().Day(), 0, 0, 0, 0, time.UTC)
	fmt.Println(req.ReportDate, "fsadfewrwa")
	sql := `INSERT INTO daily_reports(id, user_id, content, report_date) VALUES(?, ?, ?, ?)`
	_, execErr := db.DB.Exec(sql, req.ID, req.UserID, req.Content, req.ReportDate)

	if execErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": execErr.Error()})
		return
	}
	c.JSON(http.StatusOK, req)
	return
}
