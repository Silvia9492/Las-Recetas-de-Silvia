package com.silvia.recetas.service;

import com.silvia.recetas.dto.DificultadResponse;
import com.silvia.recetas.repository.DificultadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DificultadService {

    @Autowired
    private DificultadRepository dificultadRepository;
    
    public List<DificultadResponse> getAllDificultades() {
        return dificultadRepository.findAll().stream()
                .map(dif -> {
                    DificultadResponse response = new DificultadResponse();
                    response.setId(dif.getId());
                    response.setDificultad(dif.getDificultad());
                    return response;
                })
                .collect(Collectors.toList());
    }
}