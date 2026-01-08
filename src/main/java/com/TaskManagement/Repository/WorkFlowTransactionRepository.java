package com.TaskManagement.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TaskManagement.Entity.WorkFlowTransaction;
import com.TaskManagement.Enum.IssueStatus;

@Repository
public interface WorkFlowTransactionRepository extends JpaRepository<WorkFlowTransaction,Long> {

	Optional<WorkFlowTransaction> findByWorkFlowIdAndFromStatusAndToStatus(Long workFlowId, IssueStatus fromStatus, IssueStatus toStatus);
}