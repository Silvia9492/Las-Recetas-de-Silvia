package com.silvia.recetas.service;

import com.silvia.recetas.dto.RegisterRequest;
import com.silvia.recetas.model.Usuario;
import com.silvia.recetas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario register(RegisterRequest request) {
        if (usuarioRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Ya existe una cuenta con este nombre de usuario.");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setUsername(request.getUsername());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));

        return usuarioRepository.save(usuario);
    }
}