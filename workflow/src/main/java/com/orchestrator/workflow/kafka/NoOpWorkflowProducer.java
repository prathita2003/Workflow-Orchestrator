package com.orchestrator.workflow.kafka;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(
        name = "app.kafka.enabled",
        havingValue = "false",
        matchIfMissing = true
)
public class NoOpWorkflowProducer implements WorkflowEventPublisher {

    @Override
    public void publishTaskCompletedEvent(Long workflowExecutionId, Long taskId) {}

    @Override
    public void publishWorkflowCompletedEvent(Long workflowExecutionId) {}

    @Override
    public void publishWorkflowFailedEvent(Long workflowExecutionId) {}

    @Override
    public void publishTaskStartedEvent(Long workflowExecutionId, Long taskId) {}

    @Override
    public void publishWorkflowStoppedEvent(Long workflowExecutionId) {}

    @Override
    public void publishWorkflowResumedEvent(Long workflowExecutionId) {}

    @Override
    public void publishTaskStoppedEvent(Long workflowExecutionId, Long taskId) {}
}