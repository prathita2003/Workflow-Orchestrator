package com.orchestrator.workflow.dto;

import lombok.Data;

@Data
public class WorkflowEvent 
{
    private Long workflowExecutionId;
    private Long taskId;
    private String eventType;
    private String message;
}
