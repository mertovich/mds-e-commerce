package main

import (
	"api/routers"
	"api/server"
)

func main() {
	routers.Inıt()
	server.StartServer()
}
