package com.silvia.recetas.repository;

import com.silvia.recetas.model.Dificultad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DificultadRepository extends JpaRepository<Dificultad, Long>{
}