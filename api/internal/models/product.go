package models

type Product struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	SellerId    string    `json:"seller_id"`
	Seller      string    `json:"seller"`
	Image       string    `json:"image"`
	Description string    `json:"description"`
	Price       float32   `json:"price"`
	Category    string    `json:"category"`
	Comments    []Comment `json:"comments"`
	CreatedAt   string    `json:"created_at"`
}
