package models

type Company struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Surname   string    `json:"surname"`
	Password  string    `json:"password"`
	Email     string    `json:"email"`
	Products  []Product `json:"products"`
	CreatedAt string    `json:"created_at"`
	Token     string    `json:"token"`
}
