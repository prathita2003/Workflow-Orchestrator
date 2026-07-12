package com.orchestrator.workflow.dto;
import lombok.*;

@Data
public class CreateUserDTO {

    private String username;
    private String password;
    private String role;
}