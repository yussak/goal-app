package model

import "time"

type DailyReport struct {
	ID         string    `json:"id"`
	UserID     string    `json:"userId"`
	CreatedAt  time.Time `db:"createdAt"`
	UpdatedAt  time.Time `db:"updatedAt"`
	Content    string    `json:"content"`
	ReportDate time.Time `json:"reportDate"`
}
