package datamanager

import (
	"api/models"
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
