package com.silvia.recetas.dto;

import lombok.Data;

@Data
public class RecetaRequest {
    private String nombre;
    private String ingredientes;
    private String descripcion;
    private Integer tiempoPreparacion;
    private Long dificultadId;
}