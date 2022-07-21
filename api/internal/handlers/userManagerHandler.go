package handlers

import (
	"api/internal/auth"
	"api/internal/datamanager"
	"api/internal/models"
	"api/tools"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
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
		control := datamanager.RegisterControl(user.Email)
		if !control {
			tokenMap := map[string]string{
				"token": "Email already exists",
			}
			tokenJson, _ := json.Marshal(tokenMap)
			fmt.Fprintf(w, string(tokenJson))
			return
		}
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
		control := datamanager.RegisterControl(user.Email)
		if !control {
			tokenMap := map[string]string{
				"token": "Email already exists",
			}
			tokenJson, _ := json.Marshal(tokenMap)
			fmt.Fprintf(w, string(tokenJson))
			return
		}
		c := models.Company{}
		c.ID = tools.CreateId(user.AccountType)
		c.Name = user.Name
		c.Surname = user.Surname
		c.Email = user.Email
		c.Password = user.Password
		c.CreatedAt = time.Now().String()
		c.Products = []models.Product{}
		c.PurchaseHistory = []models.Product{}
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

	token := datamanager.Login(user.Email, user.Password)

	tokenMap := map[string]string{
		"token": token,
	}
	tokenJson, _ := json.Marshal(tokenMap)
	fmt.Fprintf(w, string(tokenJson))

}

func Auth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.URL.Path != "/api/auth" {
		http.NotFound(w, r)
		return
	}

	type User struct {
		Token string `json:"token"`
	}

	bodyByte, _ := ioutil.ReadAll(r.Body)
	var user User
	json.Unmarshal(bodyByte, &user)

	auth := auth.Auth(user.Token)

	authMap := map[string]bool{
		"auth": auth,
	}
	authJson, _ := json.Marshal(authMap)
	fmt.Fprintf(w, string(authJson))
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.URL.Path != "/api/user/update" {
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

	userTypeCustomer := strings.Index(user.ID, "1")
	userTypeCompany := strings.Index(user.ID, "2")

	if userTypeCustomer == 0 {
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
	} else if userTypeCompany == 0 {
		authValid := auth.Auth(user.Token)
		if authValid == true {
			newToken := datamanager.UpdateCompanyPersonal(user.ID, user.Name, user.Surname, user.Email, user.Password)
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
	} else {
		fmt.Println("Invalid id")
		maps := map[string]string{"message": "Invalid id"}
		mapsJson, _ := json.Marshal(maps)
		fmt.Fprintf(w, string(mapsJson))
		return
	}
}
