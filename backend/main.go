package main

import (
	"log"
	"net/http"

	"github.com/YusukeSakuraba/goal-app/controller"
	"github.com/YusukeSakuraba/goal-app/internal/db"
)

func main() {
	// 不具合防止のため明示的に呼び出す
	_, err := db.InitDB()
	if err != nil {
		log.Fatalf("Error initializing database: %v", err)
	}

	http.HandleFunc("/goal", corsMiddleware(controller.AddGoal))
	http.HandleFunc("/goals", corsMiddleware(controller.FetchGoals))
	http.HandleFunc("/goal/", corsMiddleware(controller.DeleteGoal))
	http.HandleFunc("/goals/", corsMiddleware(controller.FetchGoalDetail))
	
	http.HandleFunc("/goal_comment", corsMiddleware(controller.AddGoalComment))

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Content-Type", "application/json")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}