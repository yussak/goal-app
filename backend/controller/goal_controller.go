package controller

import (
	"fmt"
	"net/http"
)

func AddGoal(w http.ResponseWriter, r *http.Request) {
	// TODO:ここに書くべきじゃないと思うので確認
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Contetn-Type", "application/json")

	fmt.Println("titleee: ",r.FormValue("title"))
	fmt.Println("texttt: ",r.FormValue("text"))
	// err := r.ParseForm()

	// if err != nil {
	// 	return nil, nil
	// }

	// t := time.Now()
	// entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	// id := ulid.MustNew(ulid.Timestamp(t), entropy)

	// req := Goal {
	// 	Id:     id.String(),
	// 	Title:   r.FormValue("title"),
	// 	Text: r.FormValue("text"),
	// }

	// sql := `INSERT INTO Goal(id, title, text) VALUES(?, ?, ?)`
	// result, err := Db.Exec(sql, req.Id, req.Title, req.Text)

	// if err != nil {
	// 	return result, err
	// }
	// return result, nil
}