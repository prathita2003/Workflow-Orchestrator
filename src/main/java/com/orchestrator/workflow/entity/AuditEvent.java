package com.orchestrator.workflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuditEvent 
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Long workflowExecutionId;
    private String eventType;
    private String message;
    private LocalDateTime timestamp;
}
