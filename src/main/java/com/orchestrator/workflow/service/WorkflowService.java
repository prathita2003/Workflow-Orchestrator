package com.orchestrator.workflow.service;

import com.orchestrator.workflow.dto.DependencyDTO;
import com.orchestrator.workflow.dto.TaskDTO;
import com.orchestrator.workflow.dto.WorkflowRequestDTO;
import com.orchestrator.workflow.entity.Task;
import com.orchestrator.workflow.entity.TaskDependency;
import com.orchestrator.workflow.entity.Workflow;
import com.orchestrator.workflow.repository.TaskDependencyRepository;
import com.orchestrator.workflow.repository.TaskRepository;
import com.orchestrator.workflow.repository.WorkflowRepository;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class WorkflowService 
{
    private final WorkflowRepository wr;
    private final TaskRepository tr;
    private final TaskDependencyRepository dr;
    public WorkflowService(WorkflowRepository wr, TaskRepository tr, TaskDependencyRepository dr)
    {
        this.wr=wr;
        this.tr=tr;
        this.dr=dr;
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
   
    
}
