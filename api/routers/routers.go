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
	http.HandleFunc("/api/customer/purchase-history", handlers.CustomerPurchaseHistoryGet)
	http.HandleFunc("/api/company/purchase-history", handlers.CompanyPurchaseHistory)
	http.HandleFunc("/api/company/add-product", handlers.CompanyAddProduct)
	http.HandleFunc("/api/products", handlers.GetAllProducts)
	http.HandleFunc("/api/customer/product-buy", handlers.CustomerProductPost)
	http.HandleFunc("/api/company/product-buy", handlers.CompanyProductPost)
	http.HandleFunc("/api/product/", handlers.GetProductId)
	http.HandleFunc("/api/product-comment", handlers.AddProductComment)
}
