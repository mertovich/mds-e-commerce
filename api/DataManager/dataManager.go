package datamanager

import "api/tools"

func Login(email string, password string) (string) {
	customerList := GetCustomers()
	companyList := GetCompanies()
	var tk = ""

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

	return tk
}

func Auth(token string) (bool) {
	customerList := GetCustomers()
	companyList := GetCompanies()

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

func Test()  {
	
}
