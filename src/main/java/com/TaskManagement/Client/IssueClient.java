package com.TaskManagement.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.TaskManagement.Enum.IssueStatus;

@FeignClient(name = "issue-service", url = "${issue.service.url}")

public interface IssueClient {

	@PutMapping("{id}/status")
	void status(@PathVariable Long id, @RequestParam IssueStatus status, @RequestParam String PerformedBy);
	
	@PostMapping("{id}/commit")
	void commit(@PathVariable Long id, @RequestParam String author, @RequestParam String body);
}
