package com.TaskManagement.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "board_cards", indexes = {@Index(columnList = "boardId,column_id,position")})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardCard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long issueId;
	private Long boardId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "column_id")
	private BoardColumn column;
	
	private Integer position;

	public void setPosition(Integer position) {
		this.position = position;
	}

	public Integer getPosition() {
		return position;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIssueId() {
		return issueId;
	}

	public void setIssueId(Long issueId) {
		this.issueId = issueId;
	}

	public Long getBoardId() {
		return boardId;
	}

	public void setBoardId(Long boardId) {
		this.boardId = boardId;
	}

	public BoardColumn getColumn() {
		return column;
	}

	public void setColumn(BoardColumn column) {
		this.column = column;
	}

}
