package model

type GoalComment struct {
	ID string `json:"id"`
	GoalID string `json:goal_id`
	Title string `json:"title"`
	Text string `json:"text"`
}