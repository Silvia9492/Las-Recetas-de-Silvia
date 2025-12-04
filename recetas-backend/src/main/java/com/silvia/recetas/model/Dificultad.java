package com.silvia.recetas.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "dificultades")
@Data
public class Dificultad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String dificultad;
}