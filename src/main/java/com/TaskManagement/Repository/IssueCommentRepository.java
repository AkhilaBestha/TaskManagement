package com.TaskManagement.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TaskManagement.Entity.IssueComments;

@Repository

public interface IssueCommentRepository extends JpaRepository<IssueComments, Long> {

	List<IssueComments> findByIssueIdOrderByCreatedAt(Long issueId);

}
