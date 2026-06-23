package com.orchestrator.workflow.security;

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@Configuration
public class SecurityConfig 
{
    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
        http.csrf(csrf->csrf.disable())
                .authorizeHttpRequests(auth-> auth
                .requestMatchers("/workflows/**")
                .hasRole("ADMIN")
                .requestMatchers("/executions/start/**")
                .hasAnyRole("ADMIN","OPERATOR")
                .requestMatchers("/executions/*/tasks/*/complete","/executions/*/tasks/*fail","/executions/*/tasks/*/start")
                        .hasAnyRole("ADMIN","OPERATOR")
                        .anyRequest()
                        .authenticated())
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
