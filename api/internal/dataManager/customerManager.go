package datamanager

import (
	"api/internal/models"
	"api/tools"
	"encoding/json"
	"io/ioutil"
)

var dataPathCustomers = "../../data/customers.json"

func GetCustomers() []models.Customer {
	customers := []models.Customer{}
	customersJson, _ := ioutil.ReadFile(dataPathCustomers)
	json.Unmarshal(customersJson, &customers)
	return customers
}

func SaveCustomer(c models.Customer) {
	customers := GetCustomers()
	customers = append(customers, c)
	customersJson, _ := json.Marshal(customers)
	ioutil.WriteFile(dataPathCustomers, customersJson, 0644)
}

func UpdateCustomer(c models.Customer) {
	customers := GetCustomers()
	for i, customer := range customers {
		if customer.ID == c.ID {
			customers[i] = c
			break
		}
	}
	customersJson, _ := json.Marshal(customers)
	ioutil.WriteFile(dataPathCustomers, customersJson, 0644)
}

func UpdateCustomerPersonal(id string, name string, surname string, email string, password string) string {
	tk := ""
	customers := GetCustomers()
	for i, customer := range customers {
		if customer.ID == id {
			customers[i].Name = name
			customers[i].Surname = surname
			customers[i].Email = email
			customers[i].Password = password
			tmp := customers[i]
			customers[i].Token = tools.CreateTokenCustomer(tmp)
			tk = customers[i].Token
		}
	}

	customerJson, _ := json.Marshal(customers)
	ioutil.WriteFile(dataPathCustomers, customerJson, 0644)
	return tk
}

func GetCustomer(id string) models.Customer {
	customers := GetCustomers()
	for _, customer := range customers {
		if customer.ID == id {
			return customer
		}
	}
	return models.Customer{}
}
