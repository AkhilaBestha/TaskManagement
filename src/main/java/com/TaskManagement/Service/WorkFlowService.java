package com.TaskManagement.Service;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TaskManagement.Entity.WorkFlow;
import com.TaskManagement.Entity.WorkFlowTransaction;
import com.TaskManagement.Enum.IssueStatus;
import com.TaskManagement.Enum.Role;
import com.TaskManagement.Repository.WorkFlowTransactionRepository;
import com.TaskManagement.Repository.WorkflowRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WorkFlowService {
	
	
	@Autowired
	private WorkflowRepository workFlowRepo;
	
	@Autowired
	private WorkFlowTransactionRepository transactionRepo;
	
	public WorkFlow createworkFlow(String name,List<WorkFlowTransaction> transactions) {
		
		WorkFlow wf= new WorkFlow();
		wf.setName(name);
		for(WorkFlowTransaction t: transactions) {
			t.setWorkFlow(wf);
		}
		wf.setTransactions(transactions);
		return workFlowRepo.save(wf);
		
	}
	
	public WorkFlow getWorkflow(String name) {
		return workFlowRepo.findByName(name).orElseThrow(()-> new RuntimeException("WorkFlow not found"));
	}
	
	public List<WorkFlow>getAllWorkFlows(){
		return workFlowRepo.findAll();
	}
	
	public boolean isTransactionAllowed(Long workFlowId,IssueStatus fromStatus,IssueStatus toStatus,Set<Role> userRole) {
		
		WorkFlowTransaction wft= transactionRepo.findByWorkFlowIdAndFromStatusAndToStatus(workFlowId, fromStatus, toStatus)
				               .orElseThrow(()-> new RuntimeException("Transaction not defined:"+fromStatus+"->"+toStatus));
		
		boolean allowed= userRole.contains(wft.getRole());

		if(!allowed) {
			throw new RuntimeException("user roles"+ userRole+"not allowed fortransaction"+fromStatus+"->"+toStatus);
		}
		return true;
	}
	

}
