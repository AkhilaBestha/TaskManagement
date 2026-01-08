package com.TaskManagement.Service;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TaskManagement.Entity.Board;
import com.TaskManagement.Entity.BoardCard;
import com.TaskManagement.Entity.BoardColumn;
import com.TaskManagement.Entity.Issue;
import com.TaskManagement.Repository.BoardCardRepository;
import com.TaskManagement.Repository.BoardColumnRepository;
import com.TaskManagement.Repository.BoardRepository;
import com.TaskManagement.Repository.IssueRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	@Autowired
	private BoardRepository boardRepo;
	
	@Autowired
	private BoardCardRepository boardCardRepo;
	 
	@Autowired
	private BoardColumnRepository boardColumnRepo;
	
	@Autowired
	private IssueRepository issueRepo;
	
	public Board createBoard(Board bd) {
		return boardRepo.save(bd);
	}
	
	public BoardColumn addColumn(BoardColumn column) {
		return boardColumnRepo.save(column);
	}

	public Optional<Board> findById(Long id) {
		return boardRepo.findById(id);
	}

	public List<BoardColumn> getByColumn(Long id) {
		return boardColumnRepo.findByBoardIdOrderByPosition(id);
	}
	
	public List<BoardCard> getCardsForColumn(Long boardId, Long columnId) {
		return boardCardRepo.findByBoardIdAndColumnIdOrderByPosition(boardId,columnId);	
	}
	
	@Transactional
	public BoardCard addIssueToBoard(Long boardId, Long columnId, Long issueId) {
		Issue issue = issueRepo.findById(issueId).orElseThrow(() -> new RuntimeException("Issue not found"));
		boardCardRepo.findByIssueId(issueId).ifPresent(boardCardRepo::delete);
		BoardColumn column = boardColumnRepo.findById(columnId).orElseThrow(() -> new RuntimeException("Column not found"));
		
		if(column.getWipLimit() !=null && column.getWipLimit()>0) {
			long count = boardCardRepo.countByBoardIdAndColumnId(boardId, columnId);
			if(count>=column.getWipLimit()) {
				throw new RuntimeException("wip limit reached for column:"+column.getBoardName());
			}
		}
		List<BoardCard> existing = boardCardRepo.findByBoardIdAndColumnIdOrderByPosition(boardId, columnId);
		int pos = existing.size() + 1;
		
		BoardCard card = new BoardCard();
		card.setBoardId(boardId);
		card.setColumn(column);
		card.setIssueId(issueId);
		card.setPosition(pos);
		
		card = boardCardRepo.save(card);

		if(column.getStatusKey()!=null) {
			issue.setIssueStatus(Enum.valueOf(com.TaskManagement.Enum.IssueStatus.class,column.getStatusKey()));
			issueRepo.save(issue);
		}
		return card;
	}
	
	@Transactional 
	public void moveCard(Long boardId, Long cardId, Long columnId, int toPosition, String performedBy) {
		BoardCard card = boardCardRepo.findById(cardId).orElseThrow(() -> new RuntimeException("Card not found"));
		
		BoardColumn from = card.getColumn();
		BoardColumn to = boardColumnRepo.findById(columnId).orElseThrow(() -> new RuntimeException("Column not found"));

		if(to.getWipLimit() !=null && to.getWipLimit()>0) {
			long count = boardCardRepo.countByBoardIdAndColumnId(boardId, columnId);
			
			if(!Objects.equals(from.getId(),to.getId())&& count>=to.getWipLimit()) {
				throw new RuntimeException("wip limit reached for column:"+to.getBoardName());
			}
		}

		List<BoardCard> fromlist = boardCardRepo.findByBoardIdAndColumnIdOrderByPosition(boardId,from.getId());

		for(BoardCard bc : fromlist) {
			if(bc.getPosition()> card.getPosition()) {
				bc.setPosition(bc.getPosition() -1);
				boardCardRepo.save(bc);
			}
		}
		
		List<BoardCard> tolist = boardCardRepo.findByBoardIdAndColumnIdOrderByPosition(boardId,to.getId());
		for(BoardCard bc : tolist) {
			if(bc.getPosition()>=toPosition) {
				bc.setPosition(bc.getPosition() + 1);
				boardCardRepo.save(bc);
			}
		}
		card.setColumn(to);
		card.setPosition(toPosition);
		boardCardRepo.save(card);


		Issue issue = issueRepo.findById(card.getIssueId()).orElseThrow(() -> new RuntimeException("Issue not found"));
		if(to.getStatusKey()!=null) {
			issue.setIssueStatus(Enum.valueOf(com.TaskManagement.Enum.IssueStatus.class,to.getStatusKey()));
			issueRepo.save(issue);
		}
	}
	
	@Transactional
	public void recordColumn(Long boardId, Long columnId, List<Long> orderIds) {
		int pos = 0;
		for(Long cId : orderIds) {
			BoardCard bd = boardCardRepo.findById(cId).orElseThrow(() -> new RuntimeException("Card not found"));
			bd.setPosition(pos++);
			boardCardRepo.save(bd);
		}
	}
		@Transactional
		public void startSprint(Long sprintId) {
			
		}
		@Transactional 
		public void completeSprint(Long sprintId) {

		}
}
