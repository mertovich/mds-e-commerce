package models

type Company struct {
	ID              string    `json:"id"`
	Name            string    `json:"name"`
	Surname         string    `json:"surname"`
	Password        string    `json:"password"`
	Email           string    `json:"email"`
	Products        []Product `json:"products"`
	PurchaseHistory []Product `json:"purchase_history"`
	CreatedAt       string    `json:"created_at"`
	Token           string    `json:"token"`
}
