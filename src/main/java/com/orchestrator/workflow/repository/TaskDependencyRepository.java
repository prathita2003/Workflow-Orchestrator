package com.orchestrator.workflow.repository;

import com.orchestrator.workflow.entity.Task;
import com.orchestrator.workflow.entity.TaskDependency;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskDependencyRepository
        extends JpaRepository<TaskDependency, Long> {

    List<TaskDependency> findByToTask(Task task);
}