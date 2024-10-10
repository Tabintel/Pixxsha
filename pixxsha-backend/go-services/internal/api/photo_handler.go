package api

import (
	"encoding/json"
	"net/http"

	"github.com/tabintel/pixxsha/pixxsha-backend/go-services/internal/models"
)

func CreatePhotoHandler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		UserID string `json:"user_id"`
		Title  string `json:"title"`
		URL    string `json:"url"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	photo := models.NewPhoto(input.UserID, input.Title, input.URL)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(photo)
}
