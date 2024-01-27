package model

import "time"

type Goal struct {
	// todo:json:の方キャメルにあわせる（フロントで使うが、フロントはキャメルケースのため）
	ID        string    `json:"id"`
	UserID    string    `json:"userId"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
	Content   string    `json:"content"`
	Purpose   string    `json:"purpose"`
	Loss      *string   `json:"loss"`
	Phase     string    `json:"phase"`
	Progress  int       `json:"progress"`
}
