package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strings"
	"time"

	"github.com/YusukeSakuraba/goal-app/internal/db"
	"github.com/YusukeSakuraba/goal-app/model"
	"github.com/oklog/ulid"
)

func FetchGoals(w http.ResponseWriter, r *http.Request) {
	goals := []model.Goal{}
	
	rows, err := db.DB.Query("SELECT id, title, text FROM Goal")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var goal model.Goal
		err = rows.Scan(&goal.ID, &goal.Title, &goal.Text)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		goals = append(goals, goal)
	}

	err = json.NewEncoder(w).Encode(goals)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func AddGoal(w http.ResponseWriter, r *http.Request) {
	// デバッグ用に残す
	// fmt.Println("goal title is: ",r.FormValue("title"))
	// fmt.Println("goal text is: ",r.FormValue("text"))

	err := r.ParseForm()

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)

	req := model.Goal {
		ID:     id.String(),
		Title:   r.FormValue("title"),
		Text: r.FormValue("text"),
	}

	sql := `INSERT INTO Goal(id, title, text) VALUES(?, ?, ?)`
	_, err = db.DB.Exec(sql, req.ID, req.Title, req.Text)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = json.NewEncoder(w).Encode(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func DeleteGoal(w http.ResponseWriter, r *http.Request) {
	// デバッグ用に残す
	log.Println("DeleteGoal called with URL:", r.URL.Path)

	id := strings.TrimPrefix(r.URL.Path, "/goal/")
	fmt.Println(id)
	if id == "" {
		http.Error(w, "ID must be provided", http.StatusBadRequest)
		return
	}

	_, err := db.DB.Exec("DELETE FROM Goal WHERE id = ?", id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func FetchGoalDetail(w http.ResponseWriter, r *http.Request) {
	// queryじゃなくpathだとFormValueだと撮れない（よく調べたい）
	id := strings.TrimPrefix(r.URL.Path, "/goals/")

	row := db.DB.QueryRow("SELECT id, title, text FROM Goal WHERE id = ?", id)

    var goal model.Goal
    err := row.Scan(&goal.ID, &goal.Title, &goal.Text)
    if err != nil {
        if err == sql.ErrNoRows {
            http.Error(w, "No goal with the provided ID.", http.StatusNotFound)
            return
        }

        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    err = json.NewEncoder(w).Encode(goal)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
}
