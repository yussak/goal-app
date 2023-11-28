package model

import "time"

type Goal struct {
	ID        string    `json:"id"`
	UserID    string    `json:"user_id"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
	Content   string    `json:"content"`
	Purpose   string    `json:"purpose"`
	Loss      *string   `json:"loss"`
	Phase     string    `json:"phase"`
	Progress  int       `json:"progress"`
}
