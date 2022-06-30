package handlers

import (
	"api/datamanager"
	"encoding/json"
	"fmt"
	"net/http"
)

func GetAllProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.URL.Path != "/api/products" {
		http.NotFound(w, r)
		return
	}

	products := datamanager.GetProducts()
	productsJSON, _ := json.Marshal(products)
	fmt.Fprintf(w, string(productsJSON))
}
