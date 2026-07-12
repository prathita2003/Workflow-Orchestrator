package com.orchestrator.workflow.controller;

import com.orchestrator.workflow.entity.*;
import com.orchestrator.workflow.service.ExecutionService;
import com.orchestrator.workflow.repository.WorkflowExecutionRepository;
import com.orchestrator.workflow.dto.*;
import com.orchestrator.workflow.enums.ExecutionStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

@RestController
@RequestMapping("/executions")
public class ExecutionController 
{
    private final ExecutionService es;
    private final WorkflowExecutionRepository wer;
    
    public ExecutionController(ExecutionService es, WorkflowExecutionRepository wer)
    {
        this.es=es;
        this.wer=wer;
    }
    @PostMapping("/start/{workflowId}")
    public WorkflowExecutionResponseDTO startWorkflow(@PathVariable Long workflowId)
    {
        WorkflowExecution wfe=es.startWorkflow(workflowId);
        return es.mapToDTO(wfe);
    }
    
    @GetMapping("/{executionId}/tasks")
    public List<TaskExecutionResponseDTO> getExecutableTasks(@PathVariable Long executionId)
    {
        WorkflowExecution wfe=wer.findById(executionId).orElseThrow();
        return es.getExecutableTasks(wfe)
            .stream()
            .map(es::mapTaskToDTO)
            .toList();
    }
    
    @PostMapping("/{executionId}/tasks/{taskId}/complete")
    public String completeTask(@PathVariable Long executionId, @PathVariable Long taskId)
    {
        es.completeTask(executionId, taskId);
        return "Task completed successfully";
    }
    
    @PostMapping("/{executionId}/tasks/{taskId}/fail")
    public String failTask(@PathVariable Long executionId,@PathVariable Long taskId)
    {
        es.failTask(executionId, taskId);
        return "Task failure processed";
    }
    
    @GetMapping("/{executionId}")
    public WorkflowExecutionResponseDTO getExecution(@PathVariable Long executionId)
    {
        WorkflowExecution wfe=wer.findById(executionId).orElseThrow();
        return es.mapToDTO(wfe);
    }
    
    @PostMapping("/{executionId}/tasks/{taskId}/start")
    public String startTask(@PathVariable Long executionId, @PathVariable Long taskId)
    {
        es.startTask(executionId, taskId);
        return "Task started";
    }
    
    @GetMapping
    public List<WorkflowExecutionResponseDTO> getAllExecutions()
    {
        return es.getAllExecutions()
                .stream()
                .map(es::mapToDTO)
                .toList();
    }
    
    @GetMapping("/status/{status}")
    public List<WorkflowExecutionResponseDTO> getExecutionByStatus(@PathVariable ExecutionStatus status)
    {
        return es.getExecutionsByStatus(status)
                .stream()
                .map(es::mapToDTO)
                .toList();
    }
    
    @GetMapping("/{executionId}/allTasks")
public List<TaskExecutionResponseDTO> getAllTaskExecutions(
        @PathVariable Long executionId) {

    return es.getAllTaskExecutions(executionId)
            .stream()
            .map(es::mapTaskToDTO)
            .toList();
}

@PostMapping("/{executionId}/tasks/{taskId}/retry")
public String retryTask(
        @PathVariable Long executionId,
        @PathVariable Long taskId) {

    es.retryTask(executionId, taskId);

    return "Task retried";
}
@PostMapping("/{id}/stop")
public ResponseEntity<String> stopWorkflow(
        @PathVariable Long id)
{

    es.stopWorkflow(id);

    return ResponseEntity.ok("Workflow stopped.");

}
@PostMapping("/{id}/resume")
public ResponseEntity<String> resumeWorkflow(
        @PathVariable Long id)
{

    es.resumeWorkflow(id);

    return ResponseEntity.ok("Workflow resumed.");

}
   
}
