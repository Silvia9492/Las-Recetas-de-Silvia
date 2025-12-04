package com.silvia.recetas.service;

import com.silvia.recetas.dto.RecetaRequest;
import com.silvia.recetas.dto.RecetaResponse;
import com.silvia.recetas.model.Dificultad;
import com.silvia.recetas.model.Receta;
import com.silvia.recetas.model.Usuario;
import com.silvia.recetas.repository.DificultadRepository;
import com.silvia.recetas.repository.RecetaRepository;
import com.silvia.recetas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecetaService {
    @Autowired
    private RecetaRepository recetaRepository;
    
    @Autowired
    private DificultadRepository dificultadRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public List<RecetaResponse> getAllRecetas() {
        return recetaRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public RecetaResponse getRecetaById(Long id) {
        Receta receta = recetaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se ha podido encontrar la receta."));
        return convertToResponse(receta);
    }
    
    public RecetaResponse createReceta(RecetaRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("No se ha podido enconrtar el usuario."));
        
        Dificultad dificultad = dificultadRepository.findById(request.getDificultadId())
                .orElseThrow(() -> new RuntimeException("No se ha podido consultar la dificultad."));
        
        Receta receta = new Receta();
        receta.setNombre(request.getNombre());
        receta.setIngredientes(request.getIngredientes());
        receta.setDescripcion(request.getDescripcion());
        receta.setTiempoPreparacion(request.getTiempoPreparacion());
        receta.setDificultad(dificultad);
        receta.setUsuario(usuario);
        
        Receta savedReceta = recetaRepository.save(receta);
        return convertToResponse(savedReceta);
    }

    public RecetaResponse updateReceta(Long id, RecetaRequest request) {
        Receta receta = recetaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("No se ha podido encontrar la receta."));

        receta.setNombre(request.getNombre());
        receta.setIngredientes(request.getIngredientes());
        receta.setDescripcion(request.getDescripcion());
        receta.setTiempoPreparacion(request.getTiempoPreparacion());

        Dificultad dificultad = dificultadRepository.findById(request.getDificultadId())
            .orElseThrow(() -> new RuntimeException("No se ha podido consultar la dificultad."));
        receta.setDificultad(dificultad);

        Receta updated = recetaRepository.save(receta);
        return convertToResponse(updated);
    }
    
    public void deleteReceta(Long id) {
        recetaRepository.deleteById(id);
    }
    
    private RecetaResponse convertToResponse(Receta receta) {
        RecetaResponse response = new RecetaResponse();
        response.setId(receta.getId());
        response.setNombre(receta.getNombre());
        response.setIngredientes(receta.getIngredientes());
        response.setDescripcion(receta.getDescripcion());
        response.setTiempoPreparacion(receta.getTiempoPreparacion());
        response.setDificultad(receta.getDificultad().getDificultad());
        response.setDificultadId(receta.getDificultad().getId());
        response.setUsuarioNombre(receta.getUsuario().getNombre());
        response.setFechaCreacion(receta.getFechaCreacion());
        return response;
    }
}