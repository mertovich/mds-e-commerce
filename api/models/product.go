package models

type Product struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Image       string    `json:"image"`
	Description string    `json:"description"`
	Price       int       `json:"price"`
	Comments    []Comment `json:"comments"`
	CreatedAt   string    `json:"created_at"`
}