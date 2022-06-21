package tools

import (
	"api/models"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func CreateTokenCustomer(customer models.Customer) string {

	key := []byte("secret")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":        customer.ID,
		"name":      customer.Name,
		"surname":   customer.Surname,
		"email":     customer.Email,
		"password":  customer.Password,
		"createdAt": customer.CreatedAt,
		"exp":       time.Now().Add(time.Hour * 24).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, _ := token.SignedString(key)

	return tokenString
}

func CreateTokenCompany(company models.Company) string {

	key := []byte("secret")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":        company.ID,
		"name":      company.Name,
		"surname":   company.Surname,
		"email":     company.Email,
		"password":  company.Password,
		"createdAt": company.CreatedAt,
		"exp":       time.Now().Add(time.Hour * 24).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, _ := token.SignedString(key)

	return tokenString
}

func SigninToken(tk string) string {
	key := []byte("secret")
	tokenString := tk

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return key, nil
	})

	if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		tokenString = fmt.Sprintf("%v", token.Valid)

	} else {
		fmt.Println(err)
		tokenString = fmt.Sprintf("%v", err)
	}
	return tokenString
}
