package handlers

import (
	"api/auth"
	"api/datamanager"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func UpdateCustomer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.URL.Path != "/api/customer/update" {
		http.NotFound(w, r)
		return
	}

	type User struct {
		ID       string `json:"id"`
		Name     string `json:"name"`
		Surname  string `json:"surname"`
		Email    string `json:"email"`
		Password string `json:"password"`
		Token    string `json:"token"`
	}

	bodyByte, _ := ioutil.ReadAll(r.Body)
	var user User
	json.Unmarshal(bodyByte, &user)

	authValid := auth.Auth(user.Token)
	if authValid == true {
		newToken := datamanager.UpdateCustomerPersonal(user.ID, user.Name, user.Surname, user.Email, user.Password)
		maps := map[string]string{"message": "Success", "token": newToken}
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
