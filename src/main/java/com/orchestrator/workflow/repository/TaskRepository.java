package com.orchestrator.workflow.repository;

import com.orchestrator.workflow.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long>
{
    
}
