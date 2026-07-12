package com.orchestrator.workflow.repository;

import com.orchestrator.workflow.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long>
{
    List<Task> findByWorkflow(Workflow workflow);
}
