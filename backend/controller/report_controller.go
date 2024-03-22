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

func AddReport(c *gin.Context) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)

	var req model.DailyReport
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 日報の投稿年月日を取得
	// 以前JSTで取得していたが、GoだけでなくMySQL側も対応が必要そうなのと別にUTCでも問題ない気がしているので以下で進めている
	now := time.Now()
	req.ReportDate = time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.UTC)

	// ユーザーIDと日付から重複チェック
	// 一日一件だけ追加可能にするため、あるユーザーがすでに今日の投稿をしているか確認。していない場合のみ追加可能にする
	var count int
	err := db.DB.QueryRow(`SELECT COUNT(*) FROM daily_reports WHERE user_id = ? AND report_date = ?`, req.UserID, req.ReportDate).Scan(&count)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if count > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "既に今日のレポートが存在します"})
		return
	}

	req.ID = id.String()

	sql := `INSERT INTO daily_reports(id, user_id, content, report_date) VALUES(?, ?, ?, ?)`
	_, execErr := db.DB.Exec(sql, req.ID, req.UserID, req.Content, req.ReportDate)

	if execErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error4": execErr.Error()})
		return
	}
	c.JSON(http.StatusOK, req)
}

func FetchReports(c *gin.Context) {
	userId := c.Param("userId")

	reports, err := fetchReportsFromDB(userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, reports)
}

func fetchReportsFromDB(userId string) ([]model.DailyReport, error) {
	reports := []model.DailyReport{}

	var rows *sql.Rows
	var err error

	rows, err = db.DB.Query("SELECT * FROM daily_reports WHERE user_id = ?", userId)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var report model.DailyReport
		err = rows.Scan(&report.ID, &report.UserID, &report.ReportDate, &report.Content, &report.CreatedAt, &report.UpdatedAt)
		if err != nil {
			return nil, err
		}
		reports = append(reports, report)
	}

	return reports, nil
}

func FetchReportDetails(c *gin.Context) {
	id := c.Param("reportId")

	row := db.DB.QueryRow("SELECT * FROM daily_reports WHERE id = ?", id)

	var report model.DailyReport
	err := row.Scan(&report.ID, &report.UserID, &report.ReportDate, &report.Content, &report.CreatedAt, &report.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "No report with the provided ID."})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, report)
}

func DeleteReport(c *gin.Context) {
	id := c.Param("reportId")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID must be provided"})
		return
	}

	_, err := db.DB.Exec("DELETE FROM daily_reports WHERE id = ?", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success"})
}
