package datamanager

import (
	"api/models"
	"encoding/json"
	"io/ioutil"
)

var dataPathCompanies = "../../data/companies.json"

func GetCompanies() []models.Company {
	companies := []models.Company{}
	companiesJson, _ := ioutil.ReadFile(dataPathCompanies)
	json.Unmarshal(companiesJson, &companies)
	return companies
}

func SaveCompany(c models.Company) {
	companies := GetCompanies()
	companies = append(companies, c)
	companiesJson, _ := json.Marshal(companies)
	ioutil.WriteFile(dataPathCompanies, companiesJson, 0644)
}
