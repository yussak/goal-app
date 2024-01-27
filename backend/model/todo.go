package model

import "time"

type Todo struct {
	ID          string    `json:"id"`
	ParentID    string    `json:"parentId"`
	UserID      string    `json:"userId"`
	Content     string    `json:"content"`
	IsCompleted bool      `json:"isCompleted"`
	CreatedAt   time.Time `db:"createdAt"`
	UpdatedAt   time.Time `db:"updatedAt"`
}
