import React, { useState, useEffect } from 'react';
import { FaPlus, FaEllipsisV } from 'react-icons/fa';
import Header from '../components/Header';
import Modal from '../components/Modal';
import { boardAPI } from '../services/api';

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [boardFormData, setBoardFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    // For demo purposes, using mock data
    setLoading(false);
    const mockBoards = [
      { id: 1, name: 'Project Alpha', description: 'Main project board' },
      { id: 2, name: 'Sprint Board', description: 'Current sprint tasks' },
    ];
    setBoards(mockBoards);

    // Set default columns for Kanban view
    const mockColumns = [
      {
        id: 1,
        name: 'To Do',
        cards: [
          { id: 1, title: 'Design system components', assignee: 'John', priority: 'HIGH' },
          { id: 2, title: 'API documentation', assignee: 'Jane', priority: 'MEDIUM' },
        ]
      },
      {
        id: 2,
        name: 'In Progress',
        cards: [
          { id: 3, title: 'User authentication', assignee: 'Mike', priority: 'HIGH' },
          { id: 4, title: 'Database migrations', assignee: 'Sarah', priority: 'MEDIUM' },
        ]
      },
      {
        id: 3,
        name: 'Review',
        cards: [
          { id: 5, title: 'Payment integration', assignee: 'John', priority: 'HIGH' },
        ]
      },
      {
        id: 4,
        name: 'Done',
        cards: [
          { id: 6, title: 'Project setup', assignee: 'Jane', priority: 'LOW' },
          { id: 7, title: 'Environment config', assignee: 'Mike', priority: 'MEDIUM' },
        ]
      }
    ];
    setColumns(mockColumns);
    if (mockBoards.length > 0) {
      setSelectedBoard(mockBoards[0]);
    }
  };

  const handleBoardCreate = async (e) => {
    e.preventDefault();
    try {
      await boardAPI.createBoard(boardFormData);
      fetchBoards();
    } catch (error) {
      // Add locally for demo
      const newBoard = { id: Date.now(), ...boardFormData };
      setBoards(prev => [...prev, newBoard]);
    }
    setShowBoardModal(false);
    setBoardFormData({ name: '', description: '' });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return '#ef4444';
      case 'MEDIUM': return '#f59e0b';
      case 'LOW': return '#10b981';
      default: return '#6b7280';
    }
  };

  const handleDragStart = (e, cardId, sourceColumnId) => {
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('sourceColumnId', sourceColumnId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const cardId = parseInt(e.dataTransfer.getData('cardId'));
    const sourceColumnId = parseInt(e.dataTransfer.getData('sourceColumnId'));

    if (sourceColumnId === targetColumnId) return;

    setColumns(prevColumns => {
      const newColumns = prevColumns.map(col => ({ ...col, cards: [...col.cards] }));
      const sourceColumn = newColumns.find(c => c.id === sourceColumnId);
      const targetColumn = newColumns.find(c => c.id === targetColumnId);

      const cardIndex = sourceColumn.cards.findIndex(c => c.id === cardId);
      const [card] = sourceColumn.cards.splice(cardIndex, 1);
      targetColumn.cards.push(card);

      return newColumns;
    });
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <Header
        title="Boards"
        subtitle="Visualize and manage your workflow"
      />

      {/* Board Selection */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="flex-between">
          <div className="flex gap-4">
            {boards.map(board => (
              <button
                key={board.id}
                className={`btn ${selectedBoard?.id === board.id ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedBoard(board)}
              >
                {board.name}
              </button>
            ))}
          </div>
          <button className="btn btn-primary" onClick={() => setShowBoardModal(true)}>
            <FaPlus /> New Board
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      {selectedBoard && (
        <div className="kanban-board">
          {columns.map(column => (
            <div
              key={column.id}
              className="kanban-column"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="kanban-column-header">
                <span className="kanban-column-title">{column.name}</span>
                <span className="kanban-column-count">{column.cards.length}</span>
              </div>

              {column.cards.map(card => (
                <div
                  key={card.id}
                  className="kanban-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, card.id, column.id)}
                >
                  <div className="kanban-card-title">{card.title}</div>
                  <div className="kanban-card-meta">
                    <span style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: getPriorityColor(card.priority),
                      marginRight: '6px'
                    }}></span>
                    <span>{card.priority}</span>
                    <span style={{
                      background: 'var(--primary-color)',
                      color: 'white',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      {card.assignee?.charAt(0)}
                    </span>
                  </div>
                </div>
              ))}

              <button className="btn btn-outline btn-sm" style={{ width: '100%', marginTop: '8px' }}>
                <FaPlus /> Add Card
              </button>
            </div>
          ))}

          {/* Add Column */}
          <div
            className="kanban-column"
            style={{
              background: 'transparent',
              border: '2px dashed var(--gray-300)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '200px'
            }}
          >
            <button className="btn btn-outline">
              <FaPlus /> Add Column
            </button>
          </div>
        </div>
      )}

      {/* Create Board Modal */}
      <Modal isOpen={showBoardModal} onClose={() => setShowBoardModal(false)} title="Create New Board">
        <form onSubmit={handleBoardCreate}>
          <div className="form-group">
            <label className="form-label">Board Name *</label>
            <input
              type="text"
              className="form-input"
              value={boardFormData.name}
              onChange={(e) => setBoardFormData({ ...boardFormData, name: e.target.value })}
              required
              placeholder="Enter board name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={boardFormData.description}
              onChange={(e) => setBoardFormData({ ...boardFormData, description: e.target.value })}
              placeholder="Enter board description"
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowBoardModal(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Board
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Boards;

