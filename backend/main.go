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

	http.HandleFunc("/goal", controller.AddGoal)
	http.HandleFunc("/goals", controller.FetchGoals)
	http.HandleFunc("/goal/", controller.DeleteGoal)
	
	log.Fatal(http.ListenAndServe(":8080", nil))
}
