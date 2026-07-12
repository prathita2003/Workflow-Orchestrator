package com.orchestrator.workflow.service;

import com.orchestrator.workflow.dto.WorkflowEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    public void send(WorkflowEvent event){

        messagingTemplate.convertAndSend(
                "/topic/events",
                event
        );

    }

}