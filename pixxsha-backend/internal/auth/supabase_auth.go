
package auth

import (
    "github.com/supabase-community/supabase-go"
)

var supabaseClient *supabase.Client

func InitSupabase() error {
    var err error
    supabaseClient, err = supabase.NewClient(os.Getenv("SUPABASE_URL"), os.Getenv("SUPABASE_ANON_KEY"), nil)
    return err
}

func SignUp(email, password string) (*supabase.User, error) {
    return supabaseClient.Auth.SignUp(email, password)
}

func SignIn(email, password string) (*supabase.Session, error) {
    return supabaseClient.Auth.SignIn(email, password)
}