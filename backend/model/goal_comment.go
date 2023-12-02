package model

import "time"

type GoalComment struct {
	ID        string    `json:"id"`
	UserID    string    `json:"user_id"`
	GoalID    string    `json:"goal_id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}
