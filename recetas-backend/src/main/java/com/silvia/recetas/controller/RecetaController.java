package com.silvia.recetas.controller;

import com.silvia.recetas.dto.RecetaRequest;
import com.silvia.recetas.dto.RecetaResponse;
import com.silvia.recetas.service.RecetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/recetas")
@CrossOrigin(origins = "http://localhost:4200")
public class RecetaController {

    @Autowired
    private RecetaService recetaService;
    
    @GetMapping
    public ResponseEntity<List<RecetaResponse>> getAllRecetas() {
        return ResponseEntity.ok(recetaService.getAllRecetas());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<RecetaResponse> getRecetaById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(recetaService.getRecetaById(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<RecetaResponse> createReceta(@RequestBody RecetaRequest request) {
        try {
            RecetaResponse response = recetaService.createReceta(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecetaResponse> updateReceta(
        @PathVariable Long id,
        @RequestBody RecetaRequest request) {
        try {
            RecetaResponse updated = recetaService.updateReceta(id, request);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceta(@PathVariable Long id) {
        try {
            recetaService.deleteReceta(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}