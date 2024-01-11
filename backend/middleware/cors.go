package middleware

import (
	"github.com/gin-contrib/cors"
)

func GetCorsConfig() cors.Config {
	return cors.Config{
		// todo: 環境変数で書き換える
		AllowOrigins: []string{"https://pf-goal-app.net", "http://localhost:3000"},

		AllowMethods: []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},

		AllowHeaders: []string{"Accept", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},

		AllowCredentials: true,
	}
}
