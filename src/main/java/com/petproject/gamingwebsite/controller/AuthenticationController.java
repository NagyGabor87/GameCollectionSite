package com.petproject.gamingwebsite.controller;

import com.petproject.gamingwebsite.dto.AuthenticationRequest;
import com.petproject.gamingwebsite.dto.AuthenticationResponse;
import com.petproject.gamingwebsite.config.AuthenticationService;
import com.petproject.gamingwebsite.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }
    @GetMapping("/user")
    public ResponseEntity<String> getUsername(@RequestHeader HttpHeaders header) {
        String username = service.getUserNameByToken(header);
        return ResponseEntity.ok().body(username);
    }

}
