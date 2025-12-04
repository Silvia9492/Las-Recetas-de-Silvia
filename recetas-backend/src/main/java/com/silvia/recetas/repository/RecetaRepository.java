package com.silvia.recetas.repository;

import com.silvia.recetas.model.Receta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecetaRepository extends JpaRepository<Receta, Long> {
    List<Receta> findByUsuarioId(Long usuarioId);
    List<Receta> findByDificultadId(Long dificultadId);
}