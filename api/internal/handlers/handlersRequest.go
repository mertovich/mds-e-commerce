package handlers

import (
	"net/http"
)

func HandlersRequest() {
	// user routers
	http.HandleFunc("/api/register", Register)
	http.HandleFunc("/api/login", Login)
	http.HandleFunc("/api/auth", Auth)
	http.HandleFunc("/api/user/update", UpdateUser)

	// product routers
	http.HandleFunc("/api/products", GetAllProducts)
	http.HandleFunc("/api/product/", GetProductId)
	http.HandleFunc("/api/product-comment", AddProductComment)
	http.HandleFunc("/api/product-remove", RemoveItemProductList)

	// company routers
	http.HandleFunc("/api/company/purchase-history", CompanyPurchaseHistory)
	http.HandleFunc("/api/company/add-product", CompanyAddProduct)
	http.HandleFunc("/api/company/product-buy", CompanyProductBuy)
	http.HandleFunc("/api/company/product-list", CompanyProductList)

	// customer routers
	http.HandleFunc("/api/customer/purchase-history", CustomerPurchaseHistoryGet)
	http.HandleFunc("/api/customer/product-buy", CustomerProductBuy)

}
