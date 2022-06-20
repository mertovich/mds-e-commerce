package models

type Company struct {
	Id        string    `json:"id"`
	Name      string    `json:"name"`
	Surname   string    `json:"surname"`
	Products  []Product `json:"products"`
	CreatedAt string    `json:"created_at"`
}
