package com.orchestrator.workflow.kafka;

import com.orchestrator.workflow.dto.WorkflowEvent;

import com.orchestrator.workflow.entity.TaskExecution;
import com.orchestrator.workflow.entity.WorkflowExecution;

import com.orchestrator.workflow.repository.WorkflowExecutionRepository;

import com.orchestrator.workflow.service.ExecutionService;

import lombok.RequiredArgsConstructor;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkflowConsumer {

    private final ExecutionService es;

    private final WorkflowExecutionRepository wer;

    @KafkaListener(topics = "workflow-events",groupId = "workflow-group")
    public void consume(WorkflowEvent event) 
    {

        System.out.println("EVENT RECEIVED: " + event);
        if(event.getEventType().equals("TASK_COMPLETED"))
        {
            WorkflowExecution workflowExecution =wer.findById(event.getWorkflowExecutionId()).orElseThrow();
            List<TaskExecution> executableTasks =es.getExecutableTasks(workflowExecution);
            System.out.println("NEW EXECUTABLE TASKS: "+ executableTasks.size());
            for(TaskExecution te : executableTasks) 
            {
                System.out.println("EXECUTABLE TASK: "+ te.getTask().getName());
            }
        }
        else if(event.getEventType().equals("WORKFLOW_FAILED"))
        {
            System.out.println("WORKFLOW FAILED: "+event.getWorkflowExecutionId());
        }
        
    }
}