package models

import (
    "time"
    "github.com/google/uuid"
)


type Photo struct {
    ID        string    `json:"id"`
    UserID    string    `json:"user_id"`
    Title     string    `json:"title"`
    URL       string    `json:"url"`
    CreatedAt time.Time `json:"created_at"`
}

func NewPhoto(userID, title, url string) *Photo {
    return &Photo{
        ID:        uuid.New().String(),
        UserID:    userID,
        Title:     title,
        URL:       url,
        CreatedAt: time.Now(),
    }
}
