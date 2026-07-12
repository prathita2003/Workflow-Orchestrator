package com.orchestrator.workflow.dto;

import com.orchestrator.workflow.enums.ExecutionStatus;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskExecutionResponseDTO 
{
    private Long taskId;
    private String taskName;
    private String taskType;
    private ExecutionStatus status;
    private Integer retryCount;
}
