package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("📸 Pixxshaa.com Go backend starting...")

	http.HandleFunc("/health", healthCheckHandler)

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Pixxshaa Go backend is healthy!")
}
