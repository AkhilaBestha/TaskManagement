package com.TaskManagement.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "board_columns", indexes = {@Index(columnList = "board_id, position")})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardColumn {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "board_id")
	private Board board;
	
	private String boardName;
	private String statusKey;
	private Integer position;
	private Integer wipLimit;
	
	
	public Integer getWipLimit() {
		return wipLimit;
	}
	public void setWipLimit(Integer wipLimit) {
		this.wipLimit = wipLimit;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Board getBoard() {
		return board;
	}
	public void setBoard(Board board) {
		this.board = board;
	}
	public String getBoardName() {
		return boardName;
	}
	public void setBoardName(String boardName) {
		this.boardName = boardName;
	}
	public String getStatusKey() {
		return statusKey;
	}
	public void setStatusKey(String statusKey) {
		this.statusKey = statusKey;
	}
	public Integer getPosition() {
		return position;
	}
	public void setPosition(Integer position) {
		this.position = position;
	}
}
