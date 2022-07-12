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

	type Prd struct {
		ID          string           `json:"id"`
		Name        string           `json:"name"`
		SellerId    string           `json:"seller_id"`
		Seller      string           `json:"seller"`
		Image       string           `json:"image"`
		Description string           `json:"description"`
		Price       float32          `json:"price"`
		Category    string           `json:"category"`
		Comments    []models.Comment `json:"comments"`
		CreatedAt   string           `json:"created_at"`
		Token       string           `json:"token"`
	}

	var prd Prd

	p := models.Product{}
	bodyByte, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(bodyByte, &prd)
	authValid := auth.Auth(prd.Token)
	if authValid == true {
		prd.ID = tools.CreateProductId()
		prd.CreatedAt = time.Now().String()
		prd.Comments = []models.Comment{}

		p.ID = prd.ID
		p.Name = prd.Name
		p.SellerId = prd.SellerId
		p.Seller = prd.Seller
		p.Image = prd.Image
		p.Description = prd.Description
		p.Price = prd.Price
		p.Category = prd.Category
		p.Comments = prd.Comments
		p.CreatedAt = prd.CreatedAt

		datamanager.CompanyAddProduct(p)
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

func CompanyProductPost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.URL.Path != "/api/company/product-buy" {
		http.NotFound(w, r)
		return
	}

	type User struct {
		ID      string         `json:"id"`
		Token   string         `json:"token"`
		Product models.Product `json:"product"`
	}

	var user User
	bodyByte, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(bodyByte, &user)

	authValid := auth.Auth(user.Token)
	if authValid == true {
		datamanager.AddProductHistoryCompany(user.Product, user.ID)
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

func CompanyProductList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.URL.Path != "/api/company/product-list" {
		http.NotFound(w, r)
		return
	}

	type User struct {
		ID    string `json:"id"`
		Token string `json:"token"`
	}

	var user User
	bodyByte, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(bodyByte, &user)
	authValid := auth.Auth(user.Token)
	if authValid == true {
		productList := datamanager.GetCompanyProductList(user.ID)
		productListJSON, _ := json.Marshal(productList)
		fmt.Fprintf(w, string(productListJSON))
	} else {
		fmt.Println("Invalid token")
		maps := map[string]string{"message": "Invalid token"}
		mapsJson, _ := json.Marshal(maps)
		fmt.Fprintf(w, string(mapsJson))
		return
	}
}
