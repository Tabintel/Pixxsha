package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/tabintel/pixxsha/pixxsha-backend/go-services/internal/api"
	"github.com/tabintel/pixxsha/pixxsha-backend/go-services/internal/storage"
)

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	err = storage.InitDB()
	if err != nil {
		log.Fatal("Error initializing database:", err)
	}

	fmt.Println("📸 Pixxshaa.com Go backend starting...")

	http.HandleFunc("/health", healthCheckHandler)
	http.HandleFunc("/photos", api.CreatePhotoHandler)

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Pixxshaa Go backend is healthy!")
}
