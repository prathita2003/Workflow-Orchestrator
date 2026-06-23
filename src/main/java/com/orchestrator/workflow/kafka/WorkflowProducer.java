package com.orchestrator.workflow.kafka;

import com.orchestrator.workflow.dto.WorkflowEvent;

import lombok.RequiredArgsConstructor;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkflowProducer {

    private final KafkaTemplate<String, WorkflowEvent> kafkaTemplate;

    public void publishTaskCompletedEvent(Long workflowExecutionId,Long taskId) 
    {
        WorkflowEvent event =new WorkflowEvent();
        event.setWorkflowExecutionId(workflowExecutionId);
        event.setTaskId(taskId);
        event.setEventType("TASK_COMPLETED");
        event.setMessage("Task completed successfully");
        kafkaTemplate.send("workflow-events",event);
        System.out.println("EVENT PUBLISHED: " + event);
    }
    
    public void publishWorkflowCompletedEvent(Long wfeId)
    {
        WorkflowEvent event=new WorkflowEvent();
        event.setWorkflowExecutionId(wfeId);
        event.setEventType("WORKFLOW_COMPLETED");
        event.setMessage("Workflow completed successfully");
        kafkaTemplate.send("workflow-events",event);
    }
    
    public void publishWorkflowFailedEvent(Long wfeId)
    {
        WorkflowEvent event=new WorkflowEvent();
        event.setWorkflowExecutionId(wfeId);
        event.setEventType("WORKFLOW_FAILED");
        event.setMessage("Workflow failed");
        kafkaTemplate.send("workflow-events",event);
    }
}