package datamanager

import (
	"api/models"
	"api/tools"
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

func UpdateCompanyPersonal(id string, name string, surname string, email string, password string) string {
	tk := ""
	companies := GetCompanies()
	for i, company := range companies {
		if company.ID == id {
			companies[i].Name = name
			companies[i].Surname = surname
			companies[i].Email = email
			companies[i].Password = password
			tmp := companies[i]
			companies[i].Token = tools.CreateTokenCompany(tmp)
			tk = companies[i].Token
		}
	}

	companyJson, _ := json.Marshal(companies)
	ioutil.WriteFile(dataPathCompanies, companyJson, 0644)
	return tk
}

func GetCompanyPurchaseHistory(id string) []models.Product {
	companies := GetCompanies()
	for _, company := range companies {
		if company.ID == id {
			return company.PurchaseHistory
		}
	}
	return nil
}
