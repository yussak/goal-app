package model

import "time"

type Milestone struct {
	ID        string    `json:"id"`
	UserID    string    `json:"userId"`
	GoalID    string    `json:"goalId"`
	Content   string    `json:"content"`
	CreatedAt time.Time `db:"createdAt"`
	UpdatedAt time.Time `db:"updatedAt"`
}
