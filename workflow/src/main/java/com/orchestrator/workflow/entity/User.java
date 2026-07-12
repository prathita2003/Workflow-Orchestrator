package com.orchestrator.workflow.entity;

import com.orchestrator.workflow.enums.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="app_user")
public class User 
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique=true)
    private String username;
    
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Role role;
}
