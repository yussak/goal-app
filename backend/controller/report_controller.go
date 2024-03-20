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
	req.ReportDate = time.Date(time.Now().Year(), time.Now().Month(), time.Now().Day(), 0, 0, 0, 0, time.UTC)

	// ユーザーIDと日付から重複チェック
	// 一日一件だけ追加可能にするため、あるユーザーがすでにその日の投稿をしているか確認。していない場合のみ追加可能にする
	var count int
	err := db.DB.QueryRow(`SELECT COUNT(*) FROM daily_reports WHERE user_id = ? AND report_date = ?`, req.UserID, req.ReportDate).Scan(&count)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if count > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "既にその日のレポートが存在します"})
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
	return
}
