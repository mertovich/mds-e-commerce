package datamanager

import "api/tools"

func Login(email string, password string) (string, error) {
	customerList := GetCustomers()
	companyList := GetCompanies()
	var tk = ""
	var err error = nil

	for _, customer := range customerList {
		if customer.Email == email && customer.Password == password {
			customer.Token = tools.CreateTokenCustomer(customer)
			tk = customer.Token
			UpdateCustomer(customer)
			break
		}
	}

	for _, company := range companyList {
		if company.Email == email && company.Password == password {
			tk = company.Token
			break
		}
	}

	return tk, err
}
