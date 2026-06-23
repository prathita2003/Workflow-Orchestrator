package com.orchestrator.workflow.repository;

import com.orchestrator.workflow.entity.Task;
import com.orchestrator.workflow.entity.TaskExecution;
import com.orchestrator.workflow.entity.WorkflowExecution;
import com.orchestrator.workflow.enums.ExecutionStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskExecutionRepository
        extends JpaRepository<TaskExecution, Long> {

    List<TaskExecution>
    findByWorkflowExecutionAndStatus(
            WorkflowExecution workflowExecution,
            ExecutionStatus status
    );

    Optional<TaskExecution>
    findByWorkflowExecutionAndTask(
            WorkflowExecution workflowExecution,
            Task task
    );
    
    Optional<TaskExecution> findByWorkflowExecutionIdAndTaskId(Long workflowExecutionId,Long taskId);
    List<TaskExecution> findByWorkflowExecution( WorkflowExecution workflowExecution);
}