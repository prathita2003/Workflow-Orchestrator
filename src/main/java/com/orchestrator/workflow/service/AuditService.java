package com.orchestrator.workflow.service;

import com.orchestrator.workflow.entity.AuditEvent;
import com.orchestrator.workflow.repository.AuditEventRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class AuditService 
{
    private final AuditEventRepository aer;
    public AuditService(AuditEventRepository aer)
    {
        this.aer=aer;
    }
    public void logEvent(Long workflowExecutionId, String eventType, String message)
    {
        AuditEvent event=new AuditEvent();
        event.setWorkflowExecutionId(workflowExecutionId);
        event.setEventType(eventType);
        event.setMessage(message);
        event.setTimestamp(LocalDateTime.now());
        aer.save(event);        
    }
    
    public List<AuditEvent> getAuditTrail(Long workflowExecutionId)
    {
        return aer.findByWorkflowExecutionIdOrderByTimestampAsc(workflowExecutionId);
    }
}
