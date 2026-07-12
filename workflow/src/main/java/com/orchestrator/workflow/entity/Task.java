package com.orchestrator.workflow.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task 
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    
    @ManyToOne
    @JoinColumn(name="workflow_id")
    @JsonIgnore
    private Workflow workflow;
}
