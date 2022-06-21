package routers

import (
	"api/handlers"
	"net/http"
)

func Inıt() {
	http.HandleFunc("/api/register", handlers.Register)
	http.HandleFunc("/api/login", handlers.Login)
}
