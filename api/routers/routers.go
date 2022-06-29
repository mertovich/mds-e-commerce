package routers

import (
	"api/handlers"
	"net/http"
)

func Inıt() {
	http.HandleFunc("/api/register", handlers.Register)
	http.HandleFunc("/api/login", handlers.Login)
	http.HandleFunc("/api/auth", handlers.Auth)
	http.HandleFunc("/api/user/update", handlers.UpdateUser)
	http.HandleFunc("/api/customer/purchase-history", handlers.CustomerPurchaseHistory)
	http.HandleFunc("/api/company/purchase-history", handlers.CompanyPurchaseHistory)
}
