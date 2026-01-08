package com.TaskManagement.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TaskManagement.Entity.IssueLink;

@Repository
public interface IssueLinkRepository extends JpaRepository<IssueLink,Long> {
	
	List<IssueLink>findBySourceIssueId(Long sourceIssueId);
	List<IssueLink>findByTargetIssueId(Long targetIssueId );

}
