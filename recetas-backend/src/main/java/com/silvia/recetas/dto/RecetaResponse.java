package com.silvia.recetas.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RecetaResponse {
    private Long id;
    private String nombre;
    private String ingredientes;
    private String descripcion;
    private Integer tiempoPreparacion;
    private String dificultad;
    private Long dificultadId;
    private String usuarioNombre;
    private LocalDateTime fechaCreacion;
}