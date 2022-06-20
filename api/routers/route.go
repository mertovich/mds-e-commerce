package routers

import (
	"api/handlers"
	"net/http"
)

func Inıt() {
	http.HandleFunc("/api/", handlers.Hello)

}
