package com.orchestrator.workflow.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Workflow 
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany(mappedBy="workflow", cascade=CascadeType.ALL)
    @JsonIgnore
    private List<Task> tasks;
}
