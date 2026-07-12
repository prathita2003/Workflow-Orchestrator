package com.orchestrator.workflow.controller;
import org.springframework.web.bind.annotation.*;
import lombok.*;
import com.orchestrator.workflow.kafka.EventStore;
import com.orchestrator.workflow.dto.WorkflowEvent;
import java.util.*;

@RestController
@RequestMapping("/kafka")
@RequiredArgsConstructor
public class KafkaController {

    private final EventStore store;

    @GetMapping("/events")
    public List<WorkflowEvent> getEvents(){

        return store.getEvents();

    }

}