package datamanager

import (
	"api/models"
	"encoding/json"
	"io/ioutil"
)

var dataPathProducts = "../../data/products.json"

func GetProducts() []models.Product {
	products := []models.Product{}
	productsJson, _ := ioutil.ReadFile(dataPathProducts)
	json.Unmarshal(productsJson, &products)
	return products
}

func SaveProduct(p models.Product) {
	products := GetProducts()
	products = append(products, p)
	productsJson, _ := json.Marshal(products)
	ioutil.WriteFile(dataPathProducts, productsJson, 0644)
}

func GetProductId(id string) models.Product {
	products := GetProducts()
	for _, p := range products {
		if p.ID == id {
			return p
		}
	}
	return models.Product{}
}
