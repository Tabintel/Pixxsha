
package api

import (
    "github.com/gin-gonic/gin"
    "github.com/Tabintel/Pixxsha/pixxsha-backend/api/handlers"
)

func SetupRouter() *gin.Engine {
    r := gin.Default()

    auth := r.Group("/auth")
    {
        auth.POST("/signup", handlers.SignUp)
        auth.POST("/signin", handlers.SignIn)
    }

    return r
}
