package com.silvia.recetas.controller;

import com.silvia.recetas.dto.DificultadResponse;
import com.silvia.recetas.service.DificultadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/dificultades")
@CrossOrigin(origins = "http://localhost:4200")
public class DificultadController {

    @Autowired
    private DificultadService dificultadService;
    
    @GetMapping
    public ResponseEntity<List<DificultadResponse>> getAllDificultades() {
        return ResponseEntity.ok(dificultadService.getAllDificultades());
    }
}