package handlers

import (
	"api/datamanager"
	"encoding/json"
	"fmt"
	"log"
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

func GetProductId(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	keys, ok := r.URL.Query()["id"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'id' is missing")
		return
	}

	// Query()["key"] will return an array of items,
	// we only want the single item.
	key := keys[0]

	product := datamanager.GetProductId(key)
	productJSON, _ := json.Marshal(product)
	fmt.Fprintf(w, string(productJSON))
}
