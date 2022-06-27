package routers

import (
	"api/handlers"
	"net/http"
)

func Inıt() {
	http.HandleFunc("/api/register", handlers.Register)
	http.HandleFunc("/api/login", handlers.Login)
	http.HandleFunc("/api/auth", handlers.Auth)
	http.HandleFunc("/api/customer/update", handlers.UpdateCustomer)
}
