package com.orchestrator.workflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDependency 
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name="from_task_id")
    private Task fromTask;
    
    @ManyToOne
    @JoinColumn(name="to_task_id")
    private Task toTask;
}
