package main

import (
	"log"
	"net/http"

	"github.com/YusukeSakuraba/goal-app/controller"
)

func main() {
	http.HandleFunc("/goal", controller.AddGoal)
	
	log.Fatal(http.ListenAndServe(":8080", nil))
}
