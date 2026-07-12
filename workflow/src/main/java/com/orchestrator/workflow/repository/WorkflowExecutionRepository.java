package com.orchestrator.workflow.repository;

import com.orchestrator.workflow.entity.WorkflowExecution;
import com.orchestrator.workflow.enums.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface WorkflowExecutionRepository extends JpaRepository<WorkflowExecution, Long> {
    List<WorkflowExecution> findByStatus(ExecutionStatus status);

}
