package model

import "time"

type Todo struct {
	ID          string    `json:"id"`
	ParentID    string    `json:"parent_id"`
	UserID      string    `json:"user_id"`
	Content     string    `json:"content"`
	IsCompleted bool      `json:"is_completed"`
	CreatedAt   time.Time `db:"created_at"`
	UpdatedAt   time.Time `db:"updated_at"`
}
