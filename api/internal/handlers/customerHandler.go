package handlers

import (
	"api/internal/auth"
	"api/internal/dataManager"
	"api/internal/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func CustomerPurchaseHistoryGet(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.URL.Path != "/api/customer/purchase-history" {
		http.NotFound(w, r)
		return
	}

	type User struct {
		ID    string `json:"id"`
		Token string `json:"token"`
	}
	bodyByte, _ := ioutil.ReadAll(r.Body)
	var user User
	json.Unmarshal(bodyByte, &user)
	authValid := auth.Auth(user.Token)
	if authValid == true {
		purchaseHistory := dataManager.GetCustomerPurchaseHistory(user.ID)
		maps := map[string]interface{}{"message": "Success", "purchase_history": purchaseHistory}
		mapsJson, _ := json.Marshal(maps)
		fmt.Fprintf(w, string(mapsJson))
	} else {
		fmt.Println("Invalid token")
		maps := map[string]string{"message": "Invalid token"}
		mapsJson, _ := json.Marshal(maps)
		fmt.Fprintf(w, string(mapsJson))
		return
	}
}

func CustomerProductBuy(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.URL.Path != "/api/customer/product-buy" {
		http.NotFound(w, r)
		return
	}

	type User struct {
		ID      string           `json:"id"`
		Token   string           `json:"token"`
		Product []models.Product `json:"product"`
	}

	var user User
	bodyByte, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(bodyByte, &user)

	authValid := auth.Auth(user.Token)
	if authValid == true {
		dataManager.AddProductHistoryCustomer(user.Product, user.ID)
		maps := map[string]string{"message": "success"}
		mapsJson, _ := json.Marshal(maps)
		fmt.Fprintf(w, string(mapsJson))
	} else {
		fmt.Println("Invalid token")
		maps := map[string]string{"message": "Invalid token"}
		mapsJson, _ := json.Marshal(maps)
		fmt.Fprintf(w, string(mapsJson))
		return
	}

}
