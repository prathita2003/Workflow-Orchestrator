package com.orchestrator.workflow.service;

import com.orchestrator.workflow.dto.*;
import com.orchestrator.workflow.entity.Task;
import com.orchestrator.workflow.entity.TaskDependency;
import com.orchestrator.workflow.entity.Workflow;
import com.orchestrator.workflow.repository.*;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class WorkflowService 
{
    private final WorkflowRepository wr;
    private final TaskRepository tr;
    private final TaskDependencyRepository dr;
    private final TaskExecutionRepository ter;
    public WorkflowService(WorkflowRepository wr, TaskRepository tr, TaskDependencyRepository dr, TaskExecutionRepository ter)
    {
        this.wr=wr;
        this.tr=tr;
        this.dr=dr;
        this.ter=ter;
    }
    
    public Workflow createWorkFlow(Workflow w)
    {
        return wr.save(w);
    }
    public List<Workflow> getAllWorkflows()
    {
        return wr.findAll();
    }
    
    public void validateDAG(List<TaskDTO> tasks, List<DependencyDTO> deps)
    {
        if(tasks==null || tasks.isEmpty())
        {
            return;
        }
        Map<String, Integer> inDegree=new HashMap<>(); //number of prerequisites remaining, basically for a third task to start how many more tasks are needed to be completed
        Map<String, List<String>> graph=new HashMap<>(); //stores the entire graph
        for(TaskDTO task:tasks)
        {
            inDegree.put(task.getId(),0);
            graph.put(task.getId(),new ArrayList<>());
        }
        
        for(DependencyDTO dep:deps)
        {
            String from=dep.getFrom();
            String to=dep.getTo();
            graph.get(from).add(to);
            inDegree.put(to,inDegree.get(to)+1);
        }
        
        Queue<String> queue=new LinkedList<>();
        for(String node:inDegree.keySet()){
            if(inDegree.get(node)==0)
            {
                queue.add(node);
            }
        }
        int processed=0;
        while(!queue.isEmpty())
        {
            String current=queue.poll();
            processed++;
            for(String neighbor:graph.get(current))
        {
            inDegree.put(neighbor,inDegree.get(neighbor)-1);
            
            if(inDegree.get(neighbor)==0)
            {
                queue.add(neighbor);
            }
        }
            
        }
        if(processed!=tasks.size())
        {
            throw new RuntimeException("Cycle detected in workflow!"); 
        }
        
    }
    
    public void createWorkflow(WorkflowRequestDTO request)
    {
        validateDAG(request.getTasks(),request.getDependencies());
        Workflow w=new Workflow();
        w.setName(request.getName());
        w=wr.save(w);
        Map<String,Task> taskMap=new HashMap<>();
        for(TaskDTO dto:request.getTasks())
        {
            Task t=new Task();
            t.setName(dto.getName());
            t.setType(dto.getType());
            t.setWorkflow(w);
            t=tr.save(t);
            taskMap.put(dto.getId(),t);
        }
        for(DependencyDTO dep:request.getDependencies())
        {
            TaskDependency td=new TaskDependency();
            td.setFromTask(taskMap.get(dep.getFrom()));
            td.setToTask(taskMap.get(dep.getTo()));
            dr.save(td);
        }
    }
    public WorkflowDetailsDTO getWorkflowById(Long id)
    {
        Workflow w=wr.findById(id)
                .orElseThrow(()->
                new RuntimeException("Workflow not found"));
        List<Task> tasks=tr.findByWorkflow(w);
        List<TaskDependency> deps=dr.findByFromTaskIn(tasks);
        WorkflowDetailsDTO dto=new WorkflowDetailsDTO();
        dto.setId(w.getId());
        dto.setName(w.getName());
        List<TaskDTO> taskDTOs = new ArrayList<>();

Map<Long, String> idMap = new HashMap<>();

int index = 1;

for (Task task : tasks)
{
    String tempId = "T" + index++;

    idMap.put(task.getId(), tempId);

    TaskDTO taskDTO = new TaskDTO();

    taskDTO.setId(tempId);

    taskDTO.setName(task.getName());

    taskDTO.setType(task.getType());

    taskDTOs.add(taskDTO);
}

dto.setTasks(taskDTOs);

List<DependencyDTO> dependencyDTOs = new ArrayList<>();

for (TaskDependency dependency : deps)
{
    DependencyDTO dependencyDTO = new DependencyDTO();

    dependencyDTO.setFrom(
            idMap.get(dependency.getFromTask().getId())
    );

    dependencyDTO.setTo(
            idMap.get(dependency.getToTask().getId())
    );

    dependencyDTOs.add(dependencyDTO);
}

dto.setDependencies(dependencyDTOs);

    return dto;
    }
    public void deleteWorkflow(Long id)
{

    Workflow workflow = wr.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Workflow not found"));

    List<Task> tasks = tr.findByWorkflow(workflow);
    boolean hasExecutions =
        tasks.stream()
             .anyMatch(task -> ter.existsByTask(task));

if (hasExecutions)
{
    throw new RuntimeException(
        "This workflow has execution history and cannot be deleted."
    );
}

    List<TaskDependency> deps =
            dr.findByFromTaskIn(tasks);

    dr.deleteAll(deps);

    tr.deleteAll(tasks);

    wr.delete(workflow);

}
    
    public void cloneWorkflow(Long id)
{

    WorkflowDetailsDTO workflow =
            getWorkflowById(id);

    WorkflowRequestDTO request =
            new WorkflowRequestDTO();

    request.setName(
            workflow.getName() + " (Copy)"
    );

    request.setTasks(workflow.getTasks());

    request.setDependencies(
            workflow.getDependencies()
    );

    createWorkflow(request);

}
    public void updateWorkflow(Long id, WorkflowRequestDTO request)
{

    validateDAG(request.getTasks(),request.getDependencies());
    Workflow workflow =wr.findById(id)
                    .orElseThrow(() ->new RuntimeException("Workflow not found"));
    List<Task> existingTasks = tr.findByWorkflow(workflow);

boolean hasExecutions =
        existingTasks.stream()
                .anyMatch(task ->
                        ter.existsByTask(task));

if (hasExecutions)
{
    throw new RuntimeException(
            "This workflow has execution history. Clone it before editing."
    );
}

    workflow.setName(request.getName());

    wr.save(workflow);

    List<Task> oldTasks =
            tr.findByWorkflow(workflow);

    List<TaskDependency> oldDependencies =
            dr.findByFromTaskIn(oldTasks);

    dr.deleteAll(oldDependencies);

    tr.deleteAll(oldTasks);

    Map<String, Task> taskMap =
            new HashMap<>();

    for(TaskDTO dto : request.getTasks())
    {

        Task task = new Task();

        task.setName(dto.getName());

        task.setType(dto.getType());

        task.setWorkflow(workflow);

        task = tr.save(task);

        taskMap.put(dto.getId(), task);

    }

    for(DependencyDTO dep : request.getDependencies())
    {

        TaskDependency td =
                new TaskDependency();

        td.setFromTask(
                taskMap.get(dep.getFrom())
        );

        td.setToTask(
                taskMap.get(dep.getTo())
        );

        dr.save(td);

    }
}
    public List<Workflow> searchWorkflows(String search)
{
    return wr.search(search);
}
    
}
