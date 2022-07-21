package auth

import "api/internal/dataManager"

func Auth(token string) bool {
	customerList := dataManager.GetCustomers()
	companyList := dataManager.GetCompanies()

	for _, customer := range customerList {
		if customer.Token == token {
			return true
		}
	}

	for _, company := range companyList {
		if company.Token == token {
			return true
		}
	}

	return false
}
