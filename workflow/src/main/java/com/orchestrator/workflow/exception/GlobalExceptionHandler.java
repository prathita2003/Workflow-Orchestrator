package com.orchestrator.workflow.exception;

import com.orchestrator.workflow.dto.ErrorResponse;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler 
{
    @ExceptionHandler(WorkflowNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleWorkflowNotFound(WorkflowNotFoundException ex)
    {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(ex.getMessage()));
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex)
    {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(ex.getMessage()));
    }
}
