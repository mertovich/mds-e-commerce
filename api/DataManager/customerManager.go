package datamanager

import (
	"api/models"
	"encoding/json"
	"io/ioutil"
)

var dataPath = "../../data/customers.json"

func GetCustomers() []models.Customer {
	// read customers from json file
	customers := []models.Customer{}
	customersJson, _ := ioutil.ReadFile(dataPath)
	json.Unmarshal(customersJson, &customers)
	return customers
}

func SaveCustomer(c models.Customer) {
	customers := GetCustomers()
	customers = append(customers, c)
	customersJson, _ := json.Marshal(customers)
	ioutil.WriteFile(dataPath, customersJson, 0644)
}
