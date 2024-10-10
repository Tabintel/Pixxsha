package storage

import (
    "database/sql"
    "fmt"
    "os"

    "github.com/tabintel/pixxsha/pixxsha-backend/go-services/internal/models"
    _ "github.com/lib/pq"
)

var db *sql.DB

func InitDB() error {
	connStr := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=require",
		os.Getenv("SUPABASE_HOST"),
		os.Getenv("SUPABASE_USER"),
		os.Getenv("SUPABASE_PASSWORD"),
		os.Getenv("SUPABASE_DBNAME"),
		os.Getenv("SUPABASE_PORT"))

	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		return err
	}

	return db.Ping()
}

func CreatePhoto(photo *models.Photo) error {
	_, err := db.Exec("INSERT INTO photos (id, user_id, title, url, created_at) VALUES ($1, $2, $3, $4, $5)",
		photo.ID, photo.UserID, photo.Title, photo.URL, photo.CreatedAt)
	return err
}

func GetPhotosByUser(userID string) ([]*models.Photo, error) {
	rows, err := db.Query("SELECT id, user_id, title, url, created_at FROM photos WHERE user_id = $1", userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var photos []*models.Photo
	for rows.Next() {
		photo := &models.Photo{}
		err := rows.Scan(&photo.ID, &photo.UserID, &photo.Title, &photo.URL, &photo.CreatedAt)
		if err != nil {
			return nil, err
		}
		photos = append(photos, photo)
	}

	return photos, nil
}
