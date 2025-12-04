package com.silvia.recetas.service;

import com.silvia.recetas.dto.LoginRequest;
import com.silvia.recetas.dto.LoginResponse;
import com.silvia.recetas.dto.RegisterRequest;
import com.silvia.recetas.model.Usuario;
import com.silvia.recetas.repository.UsuarioRepository;
import com.silvia.recetas.security.JwtUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtUtilities jwtUtilities;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

     @Autowired
    private PasswordEncoder passwordEncoder;
    
    public LoginResponse login(LoginRequest request) {

        Usuario usuarioBD = usuarioRepository.findByUsername(request.getUsername())
                .orElse(null);
        
        if (usuarioBD == null) {
            throw new RuntimeException("No se ha podido encontrar al usuario.");
        }

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        
        String token = jwtUtilities.generateToken(request.getUsername());
        
        Usuario usuario = usuarioRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("No se ha podido encontrar al usuario."));
        
        return new LoginResponse(token, usuario.getUsername(), usuario.getNombre());
    }

    public LoginResponse register(RegisterRequest request) {

        if (usuarioRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Ya existe un usuario registrado con este nombre de usuario.");
        }
        
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setUsername(request.getUsername());
        nuevoUsuario.setNombre(request.getNombre());
        nuevoUsuario.setPassword(passwordEncoder.encode(request.getPassword()));
        
        usuarioRepository.save(nuevoUsuario);

        String token = jwtUtilities.generateToken(nuevoUsuario.getUsername());
        
        return new LoginResponse(token, nuevoUsuario.getUsername(), nuevoUsuario.getNombre());
    }
}