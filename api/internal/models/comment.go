package models

type Comment struct {
	CustomerId  string `json:"customer_id"`
	Name        string `json:"name"`
	Surname     string `json:"surname"`
	Description string `json:"description"`
}
