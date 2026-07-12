package com.orchestrator.workflow.kafka;

public interface WorkflowEventPublisher {

    void publishTaskCompletedEvent(Long workflowExecutionId, Long taskId);

    void publishWorkflowCompletedEvent(Long workflowExecutionId);

    void publishWorkflowFailedEvent(Long workflowExecutionId);

    void publishTaskStartedEvent(Long workflowExecutionId, Long taskId);

    void publishWorkflowStoppedEvent(Long workflowExecutionId);

    void publishWorkflowResumedEvent(Long workflowExecutionId);

    void publishTaskStoppedEvent(Long workflowExecutionId, Long taskId);
}