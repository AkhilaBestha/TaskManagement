package com.TaskManagement.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TaskManagement.Entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
	
	List<Task>findByAssignedToEmail(String assignedToEmail);

}
