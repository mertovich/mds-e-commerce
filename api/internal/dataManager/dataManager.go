package dataManager

import (
	"api/internal/jwt"

	"github.com/google/uuid"
)

func CreateId(acctype string) string {
	// Create a new UUID
	uuid := uuid.NewString()

	if acctype == "Customer" {
		return "1" + uuid
	} else if acctype == "Company" {
		return "2" + uuid
	} else {
		return ""
	}

	return uuid
}

func CreateProductId() string {
	// Create a new UUID
	uuid := uuid.NewString()
	return "0" + uuid
}

func Login(email string, password string) string {
	customerList := GetCustomers()
	companyList := GetCompanies()
	var tk = ""

	for _, customer := range customerList {
		if customer.Email == email && customer.Password == password {
			customer.Token = jwt.CreateTokenCustomer(customer)
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

func RegisterControl(email string) bool {
	customerList := GetCustomers()
	companyList := GetCompanies()

	for _, customer := range customerList {
		if customer.Email == email {
			return false
		}
	}

	for _, company := range companyList {
		if company.Email == email {
			return false
		}
	}
	return true
}
