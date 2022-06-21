package handlers

import (
	"api/datamanager"
	"api/models"
	"api/tools"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
)

func Register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.URL.Path != "/api/register" {
		http.NotFound(w, r)
		return
	}

	type User struct {
		Name        string `json:"name"`
		Surname     string `json:"surname"`
		Email       string `json:"email"`
		Password    string `json:"password"`
		AccountType string `json:"account_type"`
	}

	bodyByte, _ := ioutil.ReadAll(r.Body)
	var user User
	json.Unmarshal(bodyByte, &user)

	if user.AccountType == "Customer" {
		c := models.Customer{}
		c.ID = tools.CreateId(user.AccountType)
		c.Name = user.Name
		c.Surname = user.Surname
		c.Email = user.Email
		c.Password = user.Password
		c.CreatedAt = time.Now().String()
		c.PurchaseHistory = []models.Product{}
		c.Token = tools.CreateTokenCustomer(c)

		datamanager.SaveCustomer(c)

		tokenMap := map[string]string{
			"token": c.Token,
		}
		tokenJson, _ := json.Marshal(tokenMap)
		fmt.Fprintf(w, string(tokenJson))
	} else if user.AccountType == "Company" {
		c := models.Company{}
		c.ID = tools.CreateId(user.AccountType)
		c.Name = user.Name
		c.Surname = user.Surname
		c.Email = user.Email
		c.Password = user.Password
		c.CreatedAt = time.Now().String()
		c.Products = []models.Product{}
		c.Token = tools.CreateTokenCompany(c)

		datamanager.SaveCompany(c)

		tokenMap := map[string]string{
			"token": c.Token,
		}
		tokenJson, _ := json.Marshal(tokenMap)
		fmt.Fprintf(w, string(tokenJson))
	}
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.URL.Path != "/api/login" {
		http.NotFound(w, r)
		return
	}

	type User struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	bodyByte, _ := ioutil.ReadAll(r.Body)
	var user User
	json.Unmarshal(bodyByte, &user)

	token, err := datamanager.Login(user.Email, user.Password)
	if err != nil {
		fmt.Fprintf(w, "Error: %s", err)
		return
	}

	tokenMap := map[string]string{
		"token": token,
	}
	tokenJson, _ := json.Marshal(tokenMap)
	fmt.Fprintf(w, string(tokenJson))

}
