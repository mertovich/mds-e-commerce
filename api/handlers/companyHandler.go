package handlers

import (
	"api/auth"
	"api/datamanager"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func CompanyPurchaseHistory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.URL.Path != "/api/company/purchase-history" {
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
		purchaseHistory := datamanager.GetCompanyPurchaseHistory(user.ID)
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
