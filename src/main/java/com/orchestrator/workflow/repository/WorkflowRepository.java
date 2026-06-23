package com.orchestrator.workflow.repository;

import com.orchestrator.workflow.entity.Workflow;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkflowRepository extends JpaRepository<Workflow,Long>
{
}
