import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import Header from '../components/Header';
import Modal from '../components/Modal';
import { taskAPI } from '../services/api';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const [formData, setFormData] = useState({
    taskTitle: '',
    taskDescriptions: '',
    assignedToEmail: '',
    dueDate: '',
    taskStatus: 'OPEN',
    priority: 'MEDIUM'
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getAllTasks();
      setTasks(response.data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Mock data for demo
      setTasks([
        { id: 1, taskTitle: 'Design Homepage', taskDescriptions: 'Create modern homepage design', taskStatus: 'IN_PROGRESS', priority: 'HIGH', assignedToEmail: 'john@example.com', dueDate: '2026-01-20T00:00:00' },
        { id: 2, taskTitle: 'API Integration', taskDescriptions: 'Integrate payment gateway API', taskStatus: 'OPEN', priority: 'MEDIUM', assignedToEmail: 'jane@example.com', dueDate: '2026-01-22T00:00:00' },
        { id: 3, taskTitle: 'Database Setup', taskDescriptions: 'Configure MySQL database', taskStatus: 'COMPLETE', priority: 'HIGH', assignedToEmail: 'mike@example.com', dueDate: '2026-01-18T00:00:00' },
        { id: 4, taskTitle: 'User Authentication', taskDescriptions: 'Implement JWT authentication', taskStatus: 'IN_PROGRESS', priority: 'HIGH', assignedToEmail: 'sarah@example.com', dueDate: '2026-01-25T00:00:00' },
        { id: 5, taskTitle: 'Testing Module', taskDescriptions: 'Write unit tests for services', taskStatus: 'OPEN', priority: 'LOW', assignedToEmail: 'john@example.com', dueDate: '2026-01-28T00:00:00' },
        { id: 6, taskTitle: 'Documentation', taskDescriptions: 'Create API documentation', taskStatus: 'BLOCK', priority: 'MEDIUM', assignedToEmail: 'jane@example.com', dueDate: '2026-01-30T00:00:00' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskAPI.createTask(formData);
      fetchTasks();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating task:', error);
      // For demo, add to local state
      const newTask = { ...formData, id: Date.now() };
      setTasks(prev => [...prev, newTask]);
      setShowModal(false);
      resetForm();
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskAPI.updateTaskStatus(taskId, newStatus);
      fetchTasks();
    } catch (error) {
      console.error('Error updating status:', error);
      // Update locally for demo
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, taskStatus: newStatus } : t));
    }
  };

  const resetForm = () => {
    setFormData({
      taskTitle: '',
      taskDescriptions: '',
      assignedToEmail: '',
      dueDate: '',
      taskStatus: 'OPEN',
      priority: 'MEDIUM'
    });
  };

  const filteredTasks = filter === 'ALL'
    ? tasks
    : tasks.filter(t => t.taskStatus === filter);

  const getStatusBadge = (status) => {
    const statusMap = {
      'OPEN': 'badge-open',
      'IN_PROGRESS': 'badge-in-progress',
      'COMPLETE': 'badge-complete',
      'BLOCK': 'badge-block'
    };
    return statusMap[status] || 'badge-open';
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'HIGH': 'badge-high',
      'MEDIUM': 'badge-medium',
      'LOW': 'badge-low'
    };
    return priorityMap[priority] || 'badge-medium';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
        title="Tasks"
        subtitle="Manage and track all your tasks"
      />

      {/* Actions Bar */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="flex-between">
          <div className="flex gap-2">
            <select
              className="form-select"
              style={{ width: 'auto' }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETE">Complete</option>
              <option value="BLOCK">Blocked</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <FaPlus /> New Task
          </button>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Assignee</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td style={{ fontWeight: 600 }}>{task.taskTitle}</td>
                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {task.taskDescriptions}
                  </td>
                  <td>{task.assignedToEmail}</td>
                  <td>
                    <select
                      className={`badge ${getStatusBadge(task.taskStatus)}`}
                      value={task.taskStatus}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      style={{ border: 'none', cursor: 'pointer', background: 'inherit' }}
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="COMPLETE">COMPLETE</option>
                      <option value="BLOCK">BLOCKED</option>
                    </select>
                  </td>
                  <td>
                    <span className={`badge ${getPriorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>{formatDate(task.dueDate)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-secondary">
                        <FaEdit />
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTasks.length === 0 && (
          <div className="empty-state">
            <FaFilter style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--gray-300)' }} />
            <h3>No tasks found</h3>
            <p>Try adjusting your filter or create a new task</p>
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Task">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Task Title *</label>
            <input
              type="text"
              name="taskTitle"
              className="form-input"
              value={formData.taskTitle}
              onChange={handleInputChange}
              required
              placeholder="Enter task title"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="taskDescriptions"
              className="form-textarea"
              value={formData.taskDescriptions}
              onChange={handleInputChange}
              placeholder="Enter task description"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Assign To (Email) *</label>
            <input
              type="email"
              name="assignedToEmail"
              className="form-input"
              value={formData.assignedToEmail}
              onChange={handleInputChange}
              required
              placeholder="assignee@example.com"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="taskStatus"
                className="form-select"
                value={formData.taskStatus}
                onChange={handleInputChange}
              >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETE">Complete</option>
                <option value="BLOCK">Blocked</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                name="priority"
                className="form-select"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              type="datetime-local"
              name="dueDate"
              className="form-input"
              value={formData.dueDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Tasks;

