package datamanager

import "api/models"

func AddProductHistoryCustomer(p models.Product, id string) {
	c := GetCustomer(id)
	c.PurchaseHistory = append(c.PurchaseHistory, p)
	UpdateCustomer(c)
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

func AddProductHistoryCompany(p models.Product, id string) {
	c := CompanyGetId(id)
	c.PurchaseHistory = append(c.PurchaseHistory, p)
	UpdateCompany(c)
}
