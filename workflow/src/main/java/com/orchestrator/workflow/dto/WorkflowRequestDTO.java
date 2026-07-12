package com.orchestrator.workflow.dto;

import lombok.*;
import java.util.*;

@Data
public class WorkflowRequestDTO {
    private String name;
    private List<TaskDTO> tasks;
    private List<DependencyDTO> dependencies;
}
