package com.orchestrator.workflow.kafka;

import com.orchestrator.workflow.dto.WorkflowEvent;
import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class EventStore 
{
    private final LinkedList<WorkflowEvent> events= new LinkedList<>();
    public synchronized void addEvent(WorkflowEvent event)
    {
        events.addFirst(event);
        if(events.size()>50)
            events.removeLast();
    }
    
    public List<WorkflowEvent> getEvents()
    {
        return events;
    }
}
