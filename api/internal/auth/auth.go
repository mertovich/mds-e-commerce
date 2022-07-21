package auth

import "api/internal/datamanager"

func Auth(token string) bool {
	customerList := datamanager.GetCustomers()
	companyList := datamanager.GetCompanies()

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
