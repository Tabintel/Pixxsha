
package main

import (
    "log"
    "github.com/Tabintel/Pixxsha/pixxsha-backend/api"
    "github.com/Tabintel/Pixxsha/pixxsha-backend/internal/auth"
)

func main() {

	log.Println("📸 Pixxshaa.com starting...")

    if err := auth.InitSupabase(); err != nil {
        log.Fatalf("Failed to initialize Supabase: %v", err)
		
    }

    r := api.SetupRouter()
    r.Run(":8080")
}
