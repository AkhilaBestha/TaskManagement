package com.TaskManagement.Entity;
import com.TaskManagement.Enum.IssueStatus;
import com.TaskManagement.Enum.Role;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="workFlow_Transactions")

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class WorkFlowTransaction {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	
	private IssueStatus fromStatus;
	private IssueStatus toStatus;
	private String actionName;
	private Role role;
	
	
	@ManyToOne
	@JoinColumn(name="workFlow_id")
	private WorkFlow workFlow;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public IssueStatus getFromStatus() {
		return fromStatus;
	}


	public void setFromStatus(IssueStatus fromStatus) {
		this.fromStatus = fromStatus;
	}


	public IssueStatus getToStatus() {
		return toStatus;
	}


	public void setToStatus(IssueStatus toStatus) {
		this.toStatus = toStatus;
	}


	public String getActionName() {
		return actionName;
	}


	public void setActionName(String actionName) {
		this.actionName = actionName;
	}


	public Role getRole() {
		return role;
	}


	public void setRole(Role role) {
		this.role = role;
	}


	public WorkFlow getWorkFlow() {
		return workFlow;
	}


	public void setWorkFlow(WorkFlow workFlow) {
		this.workFlow = workFlow;
	}
	
	
	
	

}
