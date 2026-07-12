package com.orchestrator.workflow.exception;

public class WorkflowNotFoundException extends RuntimeException
{
    public WorkflowNotFoundException(String msg)
    {
        super(msg);
    }
}
