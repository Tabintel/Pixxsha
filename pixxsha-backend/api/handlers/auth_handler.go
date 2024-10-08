
package handlers

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/Tabintel/Pixxsha/pixxsha-backend/internal/auth"
)

func SignUp(c *gin.Context) {
    var input struct {
        Email    string `json:"email" binding:"required,email"`
        Password string `json:"password" binding:"required,min=6"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    user, err := auth.SignUp(input.Email, input.Password)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to sign up"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"user": user})
}

func SignIn(c *gin.Context) {
    var input struct {
        Email    string `json:"email" binding:"required,email"`
        Password string `json:"password" binding:"required"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    session, err := auth.SignIn(input.Email, input.Password)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"session": session})
}
