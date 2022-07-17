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

func CompanyAddProduct(p models.Product) {
	companies := GetCompanies()
	for i, company := range companies {
		if company.ID == p.SellerId {
			companies[i].Products = append(companies[i].Products, p)
		}
	}
	SaveProduct(p)
	companyJson, _ := json.Marshal(companies)
	ioutil.WriteFile(dataPathCompanies, companyJson, 0644)
}

func CompanyGetId(id string) models.Company {
	companies := GetCompanies()
	for _, company := range companies {
		if company.ID == id {
			return company
		}
	}
	return models.Company{}
}

func UpdateCompany(c models.Company) {
	companies := GetCompanies()
	for i, company := range companies {
		if company.ID == c.ID {
			companies[i] = c
		}
	}
	companyJson, _ := json.Marshal(companies)
	ioutil.WriteFile(dataPathCompanies, companyJson, 0644)
}

func GetCompanyProductList(id string) []models.Product {
	companies := GetCompanies()
	for _, company := range companies {
		if company.ID == id {
			return company.Products
		}
	}
	return nil
}

func RemoveProductCompany(id string, productId string) {
	company := CompanyGetId(id)
	companyProductList := []models.Product{}
	for _, product := range company.Products {
		if product.ID != productId {
			companyProductList = append(companyProductList, product)
		}
	}
	company.Products = companyProductList
	UpdateCompany(company)
}
