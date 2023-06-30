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

func AddGoal(w http.ResponseWriter, r *http.Request) {
	// TODO:ここに書くべきじゃないと思うので確認
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Contetn-Type", "application/json")

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