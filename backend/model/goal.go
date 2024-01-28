package model

import "time"

type Goal struct {
	ID        string    `json:"id"`
	UserID    string    `json:"userId"`
	CreatedAt time.Time `db:"createdAt"`
	UpdatedAt time.Time `db:"updatedAt"`
	Content   string    `json:"content"`
	Purpose   string    `json:"purpose"`
	Loss      *string   `json:"loss"`
	Phase     string    `json:"phase"`
	Progress  int       `json:"progress"`
}
