package tools

import "github.com/google/uuid"

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
