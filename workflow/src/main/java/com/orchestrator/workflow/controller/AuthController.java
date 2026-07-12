package com.orchestrator.workflow.controller;

import com.orchestrator.workflow.dto.LoginRequest;
import com.orchestrator.workflow.dto.LoginResponse;
import com.orchestrator.workflow.security.JwtService;
import com.orchestrator.workflow.security.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final CustomUserDetailsService userDetailsService;

    private final JwtService jwtService;

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ) {

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(

                        request.getUsername(),

                        request.getPassword()

                )

        );

        UserDetails user =
                userDetailsService.loadUserByUsername(
                        request.getUsername()
                );

        String token =
                jwtService.generateToken(user);

        return new LoginResponse(token,user.getUsername(),user.getAuthorities()
                .iterator().next().getAuthority());

    }

}