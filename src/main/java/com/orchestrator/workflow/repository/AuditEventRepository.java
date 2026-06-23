package com.orchestrator.workflow.repository;

import com.orchestrator.workflow.entity.AuditEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface AuditEventRepository extends JpaRepository<AuditEvent,Long>
{
    List<AuditEvent> findByWorkflowExecutionIdOrderByTimestampAsc(Long workflowExecutionId);
}
