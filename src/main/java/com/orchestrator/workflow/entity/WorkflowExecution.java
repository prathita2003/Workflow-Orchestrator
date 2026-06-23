package com.orchestrator.workflow.entity;

import com.orchestrator.workflow.enums.ExecutionStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkflowExecution 
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name="workflow_id")
    private Workflow workflow;
    
    @Enumerated(EnumType.STRING)
    private ExecutionStatus status;
    
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
