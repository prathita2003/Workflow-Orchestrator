package com.orchestrator.workflow.repository;

import com.orchestrator.workflow.entity.Workflow;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface WorkflowRepository extends JpaRepository<Workflow,Long>
{@Query("""
SELECT w
FROM Workflow w
WHERE LOWER(w.name) LIKE LOWER(CONCAT('%', :search, '%'))
OR CAST(w.id AS string) LIKE CONCAT('%', :search, '%')
""")
List<Workflow> search(@Param("search") String search);
}
