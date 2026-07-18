package com.orchestrator.workflow.kafka;

import com.orchestrator.workflow.dto.WorkflowEvent;

import lombok.RequiredArgsConstructor;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

@Service
@RequiredArgsConstructor
@ConditionalOnProperty(
        name = "app.kafka.enabled",
        havingValue = "true"
)
public class WorkflowProducer implements WorkflowEventPublisher {

    private final KafkaTemplate<String, WorkflowEvent> kafkaTemplate;

    public void publishTaskCompletedEvent(Long workflowExecutionId,Long taskId) 
    {
        WorkflowEvent event =new WorkflowEvent();
        event.setWorkflowExecutionId(workflowExecutionId);
        event.setTaskId(taskId);
        event.setEventType("TASK_COMPLETED");
        event.setMessage("Task completed successfully");
        /*kafkaTemplate.send("workflow-events",event);
        System.out.println("EVENT PUBLISHED: " + event);*/
        try {
    kafkaTemplate.send("workflow-events", event);
    System.out.println("========== EVENT PUBLISHED SUCCESSFULLY ==========");
    System.out.println(event);
}
catch (Exception e) {
    System.out.println("========== KAFKA PUBLISH FAILED ==========");
    e.printStackTrace();
}
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
    
    public void publishTaskStartedEvent(Long workflowExecutionId, Long taskId)
{
    WorkflowEvent event = new WorkflowEvent();

    event.setWorkflowExecutionId(workflowExecutionId);
    event.setTaskId(taskId);
    event.setEventType("TASK_STARTED");
    event.setMessage("Task started");

    try
    {
        kafkaTemplate.send("workflow-events", event).get();

        System.out.println("========== TASK STARTED EVENT PUBLISHED ==========");
        System.out.println(event);
    }
    catch(Exception e)
    {
        System.out.println("========== TASK START EVENT FAILED ==========");
        e.printStackTrace();
    }
}
    public void publishWorkflowStoppedEvent(Long wfeId)
{
    WorkflowEvent event = new WorkflowEvent();

    event.setWorkflowExecutionId(wfeId);
    event.setEventType("WORKFLOW_STOPPED");
    event.setMessage("Workflow stopped manually");

    kafkaTemplate.send("workflow-events", event);
}

public void publishWorkflowResumedEvent(Long wfeId)
{
    WorkflowEvent event = new WorkflowEvent();

    event.setWorkflowExecutionId(wfeId);
    event.setEventType("WORKFLOW_RESUMED");
    event.setMessage("Workflow resumed");

    kafkaTemplate.send("workflow-events", event);
}
public void publishTaskStoppedEvent(Long workflowExecutionId,
                                    Long taskId)
{
    WorkflowEvent event = new WorkflowEvent();

    event.setWorkflowExecutionId(workflowExecutionId);
    event.setTaskId(taskId);
    event.setEventType("TASK_STOPPED");
    event.setMessage("Task stopped manually");

    kafkaTemplate.send("workflow-events", event);
}
}