package com.orchestrator.workflow.dto;
import lombok.Data;
import java.util.*;

@Data
public class WorkflowDetailsDTO 
{
    private Long id;
    private String name;
    private List<TaskDTO> tasks;
    private List<DependencyDTO> dependencies;
}
