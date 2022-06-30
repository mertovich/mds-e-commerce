package handlers

import (
	"api/auth"
	"api/datamanager"
	"api/models"
	"api/tools"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
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

func CompanyAddProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.URL.Path != "/api/company/add-product" {
		http.NotFound(w, r)
		return
	}

	p := models.Product{}
	bodyByte, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(bodyByte, &p)
	if p.SellerId != "" {
		p.ID = tools.CreateProductId()
		p.CreatedAt = time.Now().String()
		p.Comments = []models.Comment{}

		fmt.Printf("id: %s\n", p.ID)
		fmt.Printf("Createat: %s\n", p.CreatedAt)
		fmt.Printf("name: %s\n", p.Name)
		fmt.Printf("des: %s\n", p.Description)
		fmt.Printf("price: %d\n", p.Price)
		fmt.Printf("sellerId: %s\n", p.SellerId)
		fmt.Printf("image: %s\n", p.Image)
		fmt.Printf("category: %s\n", p.Category)
		fmt.Printf("seller: %s\n", p.Seller)

		datamanager.CompanyAddProduct(p)
	}
}
