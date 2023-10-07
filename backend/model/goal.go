package model

import "time"

type Goal struct {
	ID              string    `json:"id"`
	UserID          string    `json:"user_id"`
	CreatedAt       time.Time `db:"created_at"`
	UpdatedAt       time.Time `db:"updated_at"`
	SmartS   string    `json:"smart_s"`
	SmartM string    `json:"smart_m"`
	SmartA string    `json:"smart_a"`
	SmartR   string    `json:"smart_r"`
	SmartT  string    `json:"smart_t"`
	Purpose         string    `json:"purpose"`
	Loss            *string   `json:"loss"`
	Phase           string    `json:"phase"`
	Progress        int       `json:"progress"`
}
