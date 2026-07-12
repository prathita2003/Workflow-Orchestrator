package com.orchestrator.workflow.service;

import com.orchestrator.workflow.entity.*;
import com.orchestrator.workflow.enums.ExecutionStatus;
import com.orchestrator.workflow.kafka.WorkflowProducer;
import com.orchestrator.workflow.repository.*;
import com.orchestrator.workflow.exception.*;
import com.orchestrator.workflow.dto.*;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExecutionService {

    private final WorkflowRepository wr;
    private final WorkflowExecutionRepository wer;
    private final TaskExecutionRepository ter;
    private final TaskDependencyRepository tdr;
    private final WorkflowProducer producer;
    private final AuditService as;
    private static final int MAX_RETRIES=3;

    public ExecutionService(
            WorkflowRepository wr,
            WorkflowExecutionRepository wer,
            TaskExecutionRepository ter,
            TaskDependencyRepository tdr,
            WorkflowProducer producer,
            AuditService as
    ) {
        this.wr=wr;
        this.wer=wer;
        this.ter=ter;
        this.tdr=tdr;
        this.producer=producer;
        this.as=as;
    }

    public WorkflowExecution startWorkflow(Long workflowId) {

        Workflow workflow=wr.findById(workflowId)
                .orElseThrow(() -> new WorkflowNotFoundException("Workflow not found"));

        WorkflowExecution wfe=new WorkflowExecution();

        wfe.setWorkflow(workflow);
        wfe.setStatus(ExecutionStatus.RUNNING);
        wfe.setStartTime(LocalDateTime.now());

        wfe=wer.save(wfe);
        as.logEvent(wfe.getId(),
                "WORKFLOW_STARTED",
                "Workflow execution started");

        List<Task> tasks=workflow.getTasks();

        for (Task task : tasks)
{
    TaskExecution te = new TaskExecution();

    te.setTask(task);
    te.setWorkflowExecution(wfe);
    te.setStatus(ExecutionStatus.PENDING);
    te.setRetryCount(0);

    ter.save(te);
}

startNextExecutableTasks(wfe);

return wfe;
    }

    public List<TaskExecution> getExecutableTasks(WorkflowExecution wfe) 
    {

        List<TaskExecution> pendingTasks=ter.findByWorkflowExecutionAndStatus(wfe,ExecutionStatus.PENDING);

        List<TaskExecution> executableTasks=new ArrayList<>();

        for (TaskExecution taskExecution:pendingTasks) {

            Task task=taskExecution.getTask();
            List<TaskDependency> dependencies=tdr.findByToTask(task);
            boolean canExecute=true;
            for (TaskDependency dependency:dependencies) {
                
                Task parentTask=dependency.getFromTask();
                TaskExecution parentExecution=ter.findByWorkflowExecutionAndTask(wfe, parentTask).orElse(null);
                if (parentExecution==null||parentExecution.getStatus()!=ExecutionStatus.COMPLETED) {

                    canExecute=false;
                    break;
                }
            }

            if (canExecute) {
                executableTasks.add(taskExecution);
            }
        }

        return executableTasks;
    }

    public void completeTask(Long wfeId, Long taskId) {

        WorkflowExecution wfe =wer.findById(wfeId).orElseThrow();
        Task task=new Task();
        task.setId(taskId);
        TaskExecution taskExecution=ter.findByWorkflowExecutionAndTask(wfe, task).orElseThrow();
        taskExecution.setStatus(ExecutionStatus.COMPLETED);
        taskExecution.setEndTime(LocalDateTime.now());
        ter.save(taskExecution);
        startNextExecutableTasks(wfe);
        List<TaskExecution> executableTasks = getExecutableTasks(wfe);

for(TaskExecution nextTask : executableTasks)
{
    if(nextTask.getStatus() == ExecutionStatus.PENDING)
    {
        nextTask.setStatus(ExecutionStatus.RUNNING);

        ter.save(nextTask);

        as.logEvent(
                wfe.getId(),
                "TASK_STARTED",
                "Task " + nextTask.getTask().getId() + " started"
        );

        try
        {
            producer.publishTaskStartedEvent(
                    wfe.getId(),
                    nextTask.getTask().getId()
            );
        }
        catch(Exception e)
        {
            System.out.println("Kafka unavailable");
        }
    }
}
        as.logEvent(wfe.getId(),
                "TASK_COMPLETED",
                "Task "+taskId+" completed");
        try
        {
        producer.publishTaskCompletedEvent(wfeId,taskId);
        }
        catch(Exception e)
        {
            System.out.println("Kakfa unavailable");
        }
        checkWorkflowCompletion(wfe);
    }
    
    private void checkWorkflowCompletion(WorkflowExecution wfe)
    {
        List<TaskExecution> tex=ter.findByWorkflowExecution(wfe);
        boolean allCompleted=tex.stream().allMatch(te->te.getStatus()==ExecutionStatus.COMPLETED);
        if(allCompleted)
        {
            wfe.setStatus(ExecutionStatus.COMPLETED);
            wfe.setEndTime(LocalDateTime.now());
            wer.save(wfe);
            as.logEvent(wfe.getId(), "WORKFLOW_COMPLETED", "Workflow completed successfully");
            try
            {
                producer.publishWorkflowCompletedEvent(wfe.getId());
            }
            catch(Exception e)
            {
                System.out.println("Kakfa unavailable");
            }
            
            System.out.println("Workflow "+wfe.getId()+" completed successfully");
        }
    }
    public void failTask(Long wfeId, Long taskId)
    {
        TaskExecution tex=ter.findByWorkflowExecutionIdAndTaskId(wfeId, taskId).orElseThrow();
        int currentRetry=tex.getRetryCount();
        if(currentRetry<MAX_RETRIES)
        {
            tex.setRetryCount(currentRetry+1);
            as.logEvent(wfeId, "RETRY_TRIGGERED","Retry "+tex.getRetryCount()+" for task "+taskId);
            tex.setStatus(ExecutionStatus.PENDING);
            System.out.println("Retry "+(currentRetry+1)+" scheduled for task "+taskId);
        }
        else
        {
            tex.setStatus(ExecutionStatus.FAILED);
            failWorkflow(tex.getWorkflowExecution());
            as.logEvent(wfeId, "TASK_FAILED", "Task "+taskId+" failed permanently");
            System.out.println("Task "+taskId+" permanently failed");
        }
        ter.save(tex);
    }
    
    private void failWorkflow(WorkflowExecution wfe)
    {
        wfe.setStatus(ExecutionStatus.FAILED);
        wfe.setEndTime(LocalDateTime.now());
        wer.save(wfe);
        try
        {
            producer.publishWorkflowFailedEvent(wfe.getId());
        }
        catch(Exception e)
        {
            System.out.println("Kafka unavailable");
        }        
        System.out.println("Workflow "+wfe.getId()+" failed");
    }
    
    public void startTask(Long wfeId, Long taskId)
    {
        TaskExecution tex=ter.findByWorkflowExecutionIdAndTaskId(wfeId, taskId).orElseThrow();
        tex.setStatus(ExecutionStatus.RUNNING);
        ter.save(tex);
        as.logEvent(wfeId, "TASK_STARTED", "Task "+taskId+" started");
        System.out.println("Task "+taskId+" started");
    }
    
    public WorkflowExecutionResponseDTO mapToDTO(WorkflowExecution wfe)
    {
        return new WorkflowExecutionResponseDTO(wfe.getId(),
            wfe.getWorkflow().getId(),
            wfe.getWorkflow().getName(),
            wfe.getStatus(),
            wfe.getStartTime(),
            wfe.getEndTime());
    }
    
    public TaskExecutionResponseDTO mapTaskToDTO(TaskExecution te)
    {
        return new TaskExecutionResponseDTO(
        te.getTask().getId(),
        te.getTask().getName(),
        te.getTask().getType(),
        te.getStatus(),
        te.getRetryCount());
    }
    
    public List<WorkflowExecution> getAllExecutions()
    {
        return wer.findAll();
    }
    
    public List<WorkflowExecution> getExecutionsByStatus(ExecutionStatus status)
    {
        return wer.findByStatus(status);
    }
    
    public WorkflowExecution getExecution(Long id){

    return wer.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Execution not found"));
}
    public List<TaskExecution> getAllTaskExecutions(Long executionId)
{
    WorkflowExecution execution =
            wer.findById(executionId)
                    .orElseThrow(() ->
                            new RuntimeException("Execution not found"));

    return ter.findByWorkflowExecution(execution);
}
    
    @Transactional
public TaskExecution retryTask(Long executionId, Long taskId)
{
    WorkflowExecution execution =
            wer.findById(executionId)
                    .orElseThrow(() ->
                            new RuntimeException("Execution not found"));

    TaskExecution taskExecution =
            ter.findByWorkflowExecution(execution)
                    .stream()
                    .filter(t -> t.getTask().getId().equals(taskId))
                    .findFirst()
                    .orElseThrow(() ->
                            new RuntimeException("Task execution not found"));

    if(taskExecution.getStatus() != ExecutionStatus.FAILED)
    {
        throw new RuntimeException("Only failed tasks can be retried.");
    }

    taskExecution.setStatus(ExecutionStatus.PENDING);

ter.save(taskExecution);

startNextExecutableTasks(execution);

return taskExecution;
}
    private void startNextExecutableTasks(WorkflowExecution wfe)
{
    List<TaskExecution> executableTasks = getExecutableTasks(wfe);

    for(TaskExecution taskExecution : executableTasks)
    {
        if(taskExecution.getStatus() == ExecutionStatus.PENDING)
        {
            taskExecution.setStatus(ExecutionStatus.RUNNING);

            ter.save(taskExecution);

            as.logEvent(
                    wfe.getId(),
                    "TASK_STARTED",
                    "Task " + taskExecution.getTask().getId() + " started"
            );

            try
            {
                producer.publishTaskStartedEvent(
                        wfe.getId(),
                        taskExecution.getTask().getId()
                );
            }
            catch(Exception e)
            {
                System.out.println("Kafka unavailable");
            }

            System.out.println(
                    "Automatically started task "
                            + taskExecution.getTask().getName()
            );
        }
    }
}
    public void stopWorkflow(Long id)
{
    System.out.println("===== STOP WORKFLOW =====");

    WorkflowExecution execution =
            wer.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException("Execution not found"));

    System.out.println("Execution found");

    execution.setStatus(ExecutionStatus.STOPPED);

    System.out.println("Status updated");

    execution.setEndTime(LocalDateTime.now());

    wer.save(execution);

    System.out.println("Execution saved");

    List<TaskExecution> taskExecutions =
            ter.findByWorkflowExecution(execution);

    System.out.println("Tasks = " + taskExecutions.size());

    for(TaskExecution taskExecution : taskExecutions)
    {
        System.out.println("Stopping task " + taskExecution.getTask().getId());

        if(taskExecution.getStatus() == ExecutionStatus.RUNNING)
        {
            taskExecution.setStatus(ExecutionStatus.STOPPED);

            ter.save(taskExecution);

            System.out.println("Saved task");
        }
    }

    System.out.println("Before Kafka");

    producer.publishWorkflowStoppedEvent(execution.getId());

    System.out.println("Finished");
}
    public void resumeWorkflow(Long id)
{
    WorkflowExecution execution =
            wer.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException("Execution not found"));

    if(execution.getStatus() != ExecutionStatus.STOPPED)
    {
        throw new RuntimeException(
                "Only stopped workflows can be resumed."
        );
    }

    execution.setStatus(ExecutionStatus.RUNNING);

    execution.setEndTime(null);

    wer.save(execution);
    List<TaskExecution> taskExecutions =
        ter.findByWorkflowExecution(execution);

for (TaskExecution taskExecution : taskExecutions)
{
    if (taskExecution.getStatus() == ExecutionStatus.STOPPED)
    {
        taskExecution.setStatus(ExecutionStatus.PENDING);

        ter.save(taskExecution);
    }
}

startNextExecutableTasks(execution);

    startNextExecutableTasks(execution);

    producer.publishWorkflowResumedEvent(execution.getId());

    as.logEvent(
            execution.getId(),
            "WORKFLOW_RESUMED",
            "Workflow resumed."
    );
}
}