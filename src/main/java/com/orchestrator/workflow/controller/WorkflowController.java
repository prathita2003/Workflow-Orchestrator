package com.orchestrator.workflow.controller;

import com.orchestrator.workflow.dto.WorkflowRequestDTO;
import com.orchestrator.workflow.entity.Workflow;
import com.orchestrator.workflow.service.WorkflowService;
import com.orchestrator.workflow.entity.WorkflowExecution;
import com.orchestrator.workflow.repository.WorkflowExecutionRepository;
import com.orchestrator.workflow.service.ExecutionService;
import com.orchestrator.workflow.entity.TaskExecution;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/workflows")
@RequiredArgsConstructor
public class WorkflowController {

    private final WorkflowService ws;
    private final ExecutionService es;
    private final WorkflowExecutionRepository wer;

    @PostMapping
    public ResponseEntity<String> createWorkflow(
            @RequestBody WorkflowRequestDTO request
    ) {

        ws.createWorkflow(request);

        return ResponseEntity.ok("Workflow saved successfully");
    }

    @GetMapping
    public ResponseEntity<List<Workflow>> getAllWorkflows() {

        List<Workflow> workflows = ws.getAllWorkflows();

        return ResponseEntity.ok(workflows);
    }
    @PostMapping("/{id}/start")
    public ResponseEntity<WorkflowExecution> startWorkflow(@PathVariable Long id) {

    WorkflowExecution execution =
            es.startWorkflow(id);

    return ResponseEntity.ok(execution);
}
    @GetMapping("/executables/{executionId}")
public ResponseEntity<List<TaskExecution>>
getExecutableTasks(
        @PathVariable Long executionId
) {

    WorkflowExecution workflowExecution =
            wer.findById(executionId)
                    .orElseThrow();

    List<TaskExecution> executableTasks =
            es.getExecutableTasks(workflowExecution);

    return ResponseEntity.ok(executableTasks);
}
    @PostMapping("/executions/{executionId}/tasks/{taskId}/complete")
    public ResponseEntity<String> completeTask(@PathVariable Long eid, @PathVariable Long tid)
    {
        es.completeTask(eid, tid);
        
        return ResponseEntity.ok("Task Completed");
    }
    
    @PostMapping("/{wfeId}/tasks/{taskId}/fail")
    public String failTask(@PathVariable Long wfeId, @PathVariable Long taskId)
    {
        es.failTask(wfeId, taskId);
        return "Task failed";
    }
}