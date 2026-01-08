package com.TaskManagement.Entity;

import java.time.LocalDateTime;
import java.util.*;

import com.TaskManagement.Enum.IssuePriority;
import com.TaskManagement.Enum.IssueStatus;
import com.TaskManagement.Enum.IssueType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="issues")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Issue {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable=false,unique=true)
	private String issueKey;
	
	@Column(nullable=false)
	private String issueTitle;
	
	@Column(length=2000)
	private String issueDescription;
	
	@Enumerated(EnumType.STRING)
	private IssueType issueType;
	
	 @Enumerated(EnumType.STRING)
	private IssuePriority issuePriority;
	 
	 @Enumerated(EnumType.STRING)
	 private IssueStatus issueStatus;
	 
	 private String assignedEmail;
	 private String reporterEmail;
	 
	 private Long epicId;
	 private Long sprintId;
	 private LocalDateTime createdAt=LocalDateTime.now();
	 private LocalDateTime updatedAt=LocalDateTime.now();
	private LocalDateTime dueDate;
	
	private Long workFlowId;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
	    name = "issue_label",
	    joinColumns = @JoinColumn(name = "issue_id"),
	    inverseJoinColumns = @JoinColumn(name = "label_id")
	    )
	@Builder.Default
		private Set<Label> labels = new HashSet<>();
	
	@ManyToOne
	@JoinColumn(name = "source_issue_id",nullable=false)
	private Issue sourceIssue;
	
	@ManyToOne
	@JoinColumn(name = "target_issue_id",nullable=false)
	private Issue targetIssueId;

	private Integer backLogPosition;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getIssueKey() {
		return issueKey;
	}
	public void setIssueKey(String issueKey) {
		this.issueKey = issueKey;
	}
	
	public Long getWorkFlowId() {
		return workFlowId;
	}
	public void setWorkFlowId(Long workFlowId) {
		this.workFlowId = workFlowId;
	}
	public String getIssueTitle() {
		return issueTitle;
	}
	public void setIssueTitle(String issueTitle) {
		this.issueTitle = issueTitle;
	}
	public String getIssueDescription() {
		return issueDescription;
	}
	public void setIssueDescription(String issueDescription) {
		this.issueDescription = issueDescription;
	}
	public IssueType getIssueType() {
		return issueType;
	}
	public void setIssueType(IssueType issueType) {
		this.issueType = issueType;
	}
	public IssuePriority getIssuePriority() {
		return issuePriority;
	}
	public void setIssuePriority(IssuePriority issuePriority) {
		this.issuePriority = issuePriority;
	}
	public IssueStatus getIssueStatus() {
		return issueStatus;
	}
	public void setIssueStatus(IssueStatus issueStatus) {
		this.issueStatus = issueStatus;
	}
	public String getAssignedEmail() {
		return assignedEmail;
	}
	public void setAssignedEmail(String assignedEmail) {
		this.assignedEmail = assignedEmail;
	}
	public String getReporterEmail() {
		return reporterEmail;
	}
	public void setReporterEmail(String reporterEmail) {
		this.reporterEmail = reporterEmail;
	}
	public Long getEpicId() {
		return epicId;
	}
	public void setEpicId(Long epicId) {
		this.epicId = epicId;
	}
	public Long getSprintId() {
		return sprintId;
	}
	public void setSprintId(Long sprintId) {
		this.sprintId = sprintId;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
	public LocalDateTime getDueDate() {
		return dueDate;
	}
	public Set<Label> getLabels() {
		return labels;
	}
	public void setLabels(Set<Label> labels) {
		this.labels = labels;
	}
	public void setDueDate(LocalDateTime dueDate) {
		this.dueDate = dueDate;
	}
	public Issue getSourceIssue() {
		return sourceIssue;
	}
	public void setSourceIssue(Issue sourceIssue) {
		this.sourceIssue = sourceIssue;
	}
	public Issue getTargetIssueId() {
		return targetIssueId;
	}
	public void setTargetIssueId(Issue targetIssueId) {
		this.targetIssueId = targetIssueId;
	}
	public Integer getBackLogPosition() {
		return backLogPosition;
	}
	public void setBackLogPosition(Integer backLogPosition) {
		this.backLogPosition = backLogPosition;
	}
	
	
}
