package com.TaskManagement.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TaskManagement.Entity.Issue;
import com.TaskManagement.Entity.Sprint;
import com.TaskManagement.Enum.IssueStatus;
import com.TaskManagement.Enum.SprintState;
import com.TaskManagement.Repository.IssueRepository;
import com.TaskManagement.Repository.SprintRepository;

@Service
public class ReportingService {

	@Autowired
	private IssueRepository issueRepo;
	@Autowired
	private SprintRepository sprintRepo;
	
	public Map<String, Object> burnDown(Long sprintId){
		Sprint sprint = sprintRepo.findById(sprintId).orElseThrow(() -> new RuntimeException("Sprint not found"));
		List<Issue> issues = issueRepo.findBySprintId(sprintId);
		
		int total  = issues.size();
		Map<String,Object> chart = new HashMap<>();
		
		LocalDateTime start = sprint.getStartDate();
		LocalDateTime end = sprint.getEndDate()!=null ? sprint.getEndDate() : LocalDateTime.now();
		
		for(LocalDateTime d = start;!d.isAfter(end); d = d.plusDays(1)) {
			int done = (int)issues.stream().filter(i->"DONE".equals(i.getIssueStatus().name())).count();
			chart.put(d.toString(),total - done);
		}
		Map<String,Object> response = new HashMap<>();
		response.put("sprintId",sprintId);
		response.put("burnDown",chart);
		return response;
	}
	
	public Map<String,Object> velocity(Long projectId){
		List<Sprint> completed = sprintRepo.findByProjectId(projectId).stream().filter(i-> i.getState()==SprintState.COMPLETED)
				.collect(Collectors.toList());
		Map<String,Integer> velocity = new LinkedHashMap<>();
		
		for(Sprint s : completed) {
			int done = (int)issueRepo.findBySprintId(s.getId()).stream().filter(i->i.getIssueStatus()==IssueStatus.DONE).count();
			velocity.put(s.getSprintName(),done);
		}
		Map<String,Object> response = new HashMap<>();
		response.put("projectId",projectId);
		response.put("velocity",velocity);
		return response;
	}
	
	
	
	
	
	
	
	
	
}
