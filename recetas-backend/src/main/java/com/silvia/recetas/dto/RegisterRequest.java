package com.silvia.recetas.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String nombre;
    private String username;
    private String password;
}