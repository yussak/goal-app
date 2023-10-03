package model

import "time"

type Goal struct {
	ID              string    `json:"id"`
	UserID          string    `json:"user_id"`
	CreatedAt       time.Time `db:"created_at"`
	UpdatedAt       time.Time `db:"updated_at"`
	SmartSpecific   string    `json:"smart_specific"`
	SmartMeasurable string    `json:"smart_measurable"`
	SmartAchievable string    `json:"smart_achievable"`
	SmartRelevant   string    `json:"smart_relevant"`
	SmartTimeBound  string    `json:"smart_time_bound"`
	Purpose         string    `json:"purpose"`
	Loss            *string   `json:"loss"`
	Phase           string    `json:"phase"`
	Progress        int       `json:"progress"`
}
