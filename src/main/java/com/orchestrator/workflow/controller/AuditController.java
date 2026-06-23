package com.orchestrator.workflow.controller;

import com.orchestrator.workflow.entity.AuditEvent;
import com.orchestrator.workflow.service.AuditService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/audit")
public class AuditController 
{
    private final AuditService as;
    public AuditController(AuditService as)
    {
        this.as=as;
    }
    
    @GetMapping("/{executionId}")
    public List<AuditEvent> getAuditTrail(@PathVariable Long executionId)
    {
        return as.getAuditTrail(executionId);
    }
}
