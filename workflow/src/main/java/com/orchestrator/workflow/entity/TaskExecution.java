package com.orchestrator.workflow.entity;

import com.orchestrator.workflow.enums.ExecutionStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskExecution 
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name="task_id")
    private Task task;
    
    @ManyToOne
    @JoinColumn(name="workflow_execution_id")
    private WorkflowExecution workflowExecution;
    
    @Enumerated(EnumType.STRING)
    private ExecutionStatus status;
    
    private Integer retryCount;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String errorMessage;
}
