package models

type Customer struct {
	ID              string    `json:"id"`
	Name            string    `json:"name"`
	Surname         string    `json:"surname"`
	Email           string    `json:"email"`
	Password        string    `json:"password"`
	CreatedAt       string    `json:"created_at"`
	PurchaseHistory []Product `json:"purchase_history"`
	Token           string    `json:"token"`
}
