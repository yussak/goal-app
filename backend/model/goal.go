package model

import "time"

type Goal struct {
	ID         string    `json:"id"`
	UserID     string    `json:"user_id"`
	ImageURL   *string   `json:"image_url"`
	CreatedAt  time.Time `db:"created_at"`
	UpdatedAt  time.Time `db:"updated_at"`
	Specific   string    `json:"specific"`
	Measurable string    `json:"measurable"`
	Achievable string    `json:"achievable"`
	Relevant   string    `json:"relevant"`
	TimeBound  string    `json:"time_bound"`
	Purpose    string    `json:"purpose"`
	Loss       *string   `json:"loss"`
	Phase      string    `json:"phase"`
	Progress   int       `json:"progress"`
}
