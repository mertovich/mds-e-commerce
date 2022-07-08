package handlers

import (
	"api/auth"
	"api/datamanager"
	"api/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
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

func AddProductComment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.URL.Path != "/api/product/comment" {
		http.NotFound(w, r)
		return
	}

	type User struct {
		Token   string         `json:"token"`
		Comment models.Comment `json:"comment"`
	}

	bodyByte, _ := ioutil.ReadAll(r.Body)
	var user User
	json.Unmarshal(bodyByte, &user)

	authvalid := auth.Auth(user.Token)
	if !authvalid {
		log.Println("Invalid token")
		return
	}

	fmt.Printf("%+v\n", user)

}
