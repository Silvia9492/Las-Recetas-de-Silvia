package com.silvia.recetas.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "recetas") 
@Data
public class Receta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(length = 1000)
    private String ingredientes;

    @Column(length = 2500)
    private String descripcion;

    private Integer tiempoPreparacion;

    @ManyToOne
    @JoinColumn(name = "FK_dificultad")
    private Dificultad dificultad;

    @ManyToOne
    @JoinColumn(name = "FK_usuario")
    private Usuario usuario;

    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void creationData(){
        fechaCreacion = LocalDateTime.now();
    }
}