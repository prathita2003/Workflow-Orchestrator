package com.orchestrator.workflow.dto;

import com.orchestrator.workflow.enums.ExecutionStatus;
import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkflowExecutionResponseDTO 
{
    private Long id;
    private Long workflowId;
    private String workflowName;
    private ExecutionStatus status;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
