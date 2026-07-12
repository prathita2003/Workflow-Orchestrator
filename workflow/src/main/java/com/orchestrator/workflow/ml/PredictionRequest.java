package com.orchestrator.workflow.ml;

import lombok.Data;

@Data
public class PredictionRequest {

    private String taskType;
    private int dependencyCount;
    private int retryCount;
    private int workflowSize;
    private double previousDuration;
}