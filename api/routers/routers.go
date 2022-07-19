package routers

import (
	"api/handlers"
	"net/http"
)

func Inıt() {
	// user routers
	http.HandleFunc("/api/register", handlers.Register)
	http.HandleFunc("/api/login", handlers.Login)
	http.HandleFunc("/api/auth", handlers.Auth)
	http.HandleFunc("/api/user/update", handlers.UpdateUser)

	// product routers
	http.HandleFunc("/api/products", handlers.GetAllProducts)
	http.HandleFunc("/api/product/", handlers.GetProductId)
	http.HandleFunc("/api/product-comment", handlers.AddProductComment)
	http.HandleFunc("/api/product-remove", handlers.RemoveItemProductList)

	// company routers
	http.HandleFunc("/api/company/purchase-history", handlers.CompanyPurchaseHistory)
	http.HandleFunc("/api/company/add-product", handlers.CompanyAddProduct)
	http.HandleFunc("/api/company/product-buy", handlers.CompanyProductBuy)
	http.HandleFunc("/api/company/product-list", handlers.CompanyProductList)

	// customer routers
	http.HandleFunc("/api/customer/purchase-history", handlers.CustomerPurchaseHistoryGet)
	http.HandleFunc("/api/customer/product-buy", handlers.CustomerProductBuy)

}
