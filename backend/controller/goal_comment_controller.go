package controller

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"

	"github.com/YusukeSakuraba/goal-app/internal/db"
	"github.com/YusukeSakuraba/goal-app/model"
	"github.com/oklog/ulid"
)

func AddGoalComment(w http.ResponseWriter, r *http.Request) {
	// デバッグ用に残す
	// fmt.Println("goal title is: ",r.FormValue("title"))
	// fmt.Println("goal id is: ",r.FormValue("goal_id"))
	// fmt.Println("goal text is: ",r.FormValue("text"))

	err := r.ParseForm()

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)

	req := model.GoalComment {
		ID:     id.String(),
		GoalID:   r.FormValue("goal_id"),
		Title:   r.FormValue("title"),
		Text: r.FormValue("text"),
	}

	sql := `INSERT INTO goal_comments(id, goal_id, title, text) VALUES(?, ?, ?, ?)`
	_, err = db.DB.Exec(sql, req.ID, req.GoalID, req.Title, req.Text)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = json.NewEncoder(w).Encode(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}