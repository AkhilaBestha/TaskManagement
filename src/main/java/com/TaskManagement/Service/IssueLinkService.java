package com.TaskManagement.Service;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TaskManagement.Entity.IssueLink;
import com.TaskManagement.Repository.IssueLinkRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IssueLinkService {
	
	@Autowired
	private IssueLinkRepository issueLinkRepo;
	
	
	public IssueLink createLink(Long issueSourceId,Long issueTargetId,String linkType) {
		
		IssueLink link = new IssueLink();
		link.setSourceIssueId(issueSourceId);
		link.setTargetIssueId(issueTargetId);
		link.setLinkType(linkType);
		
		return issueLinkRepo.save(link);	
	}
	
	public List<IssueLink>getLinksBySource(Long issueSourceId){
		return issueLinkRepo.findBySourceIssueId(issueSourceId);
	}
	
	public List<IssueLink>getLinksByTarget(Long issueTargetId){
		return issueLinkRepo.findByTargetIssueId(issueTargetId);
	}

	public void deleteLink(Long id) {
		issueLinkRepo.deleteById(id);
	}
}

