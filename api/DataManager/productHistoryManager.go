package datamanager

import "api/models"

func AddProductHistoryCustomer(p []models.Product, id string) {
	c := GetCustomer(id)
	c.PurchaseHistory = append(c.PurchaseHistory, p...)
	UpdateCustomer(c)
}

func AddProductHistoryCompany(p []models.Product, id string) {
	c := CompanyGetId(id)
	c.PurchaseHistory = append(c.PurchaseHistory, p...)
	UpdateCompany(c)
}

func GetCustomerPurchaseHistory(id string) []models.Product {
	customers := GetCustomers()
	for _, customer := range customers {
		if customer.ID == id {
			return customer.PurchaseHistory
		}
	}
	return nil
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
