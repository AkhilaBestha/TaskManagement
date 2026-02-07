import React, { useState, useEffect } from 'react';
import { FaPlus, FaBug, FaExclamationTriangle, FaCheckCircle, FaEye } from 'react-icons/fa';
import Header from '../components/Header';
import Modal from '../components/Modal';
import { issueAPI } from '../services/api';

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [formData, setFormData] = useState({
    issueTitle: '',
    issueDescription: '',
    issueType: 'BUG',
    issuePriority: 'MEDIUM',
    issueStatus: 'OPEN',
    assignedEmail: '',
    reporterEmail: '',
    dueDate: ''
  });

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      // For demo, using mock data
      setLoading(false);
      setIssues([
        { id: 1, issueKey: 'TM-001', issueTitle: 'Login button not working', issueDescription: 'Users cannot click the login button on mobile devices', issueType: 'BUG', issuePriority: 'HIGH', issueStatus: 'OPEN', assignedEmail: 'john@example.com', reporterEmail: 'user@example.com', createdAt: '2026-01-15T10:00:00' },
        { id: 2, issueKey: 'TM-002', issueTitle: 'Add dark mode feature', issueDescription: 'Implement dark mode theme for the application', issueType: 'STORY', issuePriority: 'MEDIUM', issueStatus: 'IN_PROGRESS', assignedEmail: 'jane@example.com', reporterEmail: 'pm@example.com', createdAt: '2026-01-14T14:00:00' },
        { id: 3, issueKey: 'TM-003', issueTitle: 'Performance optimization', issueDescription: 'Optimize database queries for faster loading', issueType: 'TASK', issuePriority: 'HIGH', issueStatus: 'IN_REVIEW', assignedEmail: 'mike@example.com', reporterEmail: 'lead@example.com', createdAt: '2026-01-13T09:00:00' },
        { id: 4, issueKey: 'TM-004', issueTitle: 'API rate limiting', issueDescription: 'Implement rate limiting for public APIs', issueType: 'TASK', issuePriority: 'MEDIUM', issueStatus: 'TODO', assignedEmail: 'sarah@example.com', reporterEmail: 'security@example.com', createdAt: '2026-01-12T16:00:00' },
        { id: 5, issueKey: 'TM-005', issueTitle: 'User profile page crash', issueDescription: 'Application crashes when viewing certain user profiles', issueType: 'BUG', issuePriority: 'HIGHEST', issueStatus: 'OPEN', assignedEmail: 'john@example.com', reporterEmail: 'support@example.com', createdAt: '2026-01-16T08:00:00' },
        { id: 6, issueKey: 'TM-006', issueTitle: 'Email notifications', issueDescription: 'Set up email notification system', issueType: 'EPIC', issuePriority: 'LOW', issueStatus: 'DONE', assignedEmail: 'jane@example.com', reporterEmail: 'pm@example.com', createdAt: '2026-01-10T11:00:00' },
      ]);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await issueAPI.createIssue(formData);
      fetchIssues();
    } catch (error) {
      // Add locally for demo
      const newIssue = {
        id: Date.now(),
        issueKey: `TM-${String(issues.length + 1).padStart(3, '0')}`,
        ...formData,
        createdAt: new Date().toISOString()
      };
      setIssues(prev => [...prev, newIssue]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleStatusChange = async (issueId, newStatus) => {
    try {
      await issueAPI.updateIssueStatus(issueId, newStatus);
      fetchIssues();
    } catch (error) {
      setIssues(prev => prev.map(i => i.id === issueId ? { ...i, issueStatus: newStatus } : i));
    }
  };

  const resetForm = () => {
    setFormData({
      issueTitle: '',
      issueDescription: '',
      issueType: 'BUG',
      issuePriority: 'MEDIUM',
      issueStatus: 'OPEN',
      assignedEmail: '',
      reporterEmail: '',
      dueDate: ''
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'BUG': return <FaBug style={{ color: '#ef4444' }} />;
      case 'STORY': return <FaCheckCircle style={{ color: '#10b981' }} />;
      case 'TASK': return <FaCheckCircle style={{ color: '#3b82f6' }} />;
      case 'EPIC': return <FaExclamationTriangle style={{ color: '#8b5cf6' }} />;
      default: return <FaBug style={{ color: '#6b7280' }} />;
    }
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'HIGHEST': { class: 'badge-high', label: 'Highest' },
      'HIGH': { class: 'badge-high', label: 'High' },
      'MEDIUM': { class: 'badge-medium', label: 'Medium' },
      'LOW': { class: 'badge-low', label: 'Low' },
      'LOWEST': { class: 'badge-low', label: 'Lowest' }
    };
    return priorityMap[priority] || { class: 'badge-medium', label: priority };
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'OPEN': 'badge-open',
      'IN_PROGRESS': 'badge-in-progress',
      'IN_REVIEW': 'badge-in-progress',
      'TODO': 'badge-open',
      'DONE': 'badge-complete',
      'CLOSED': 'badge-complete',
      'RESOLVED': 'badge-complete',
      'REOPEN': 'badge-open',
      'BLOCKS': 'badge-block',
      'DEPLOYMENT': 'badge-in-progress'
    };
    return statusMap[status] || 'badge-open';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filteredIssues = filter === 'ALL'
    ? issues
    : issues.filter(i => i.issueStatus === filter);

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
        title="Issues"
        subtitle="Track bugs, stories, and tasks"
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
              <option value="IN_REVIEW">In Review</option>
              <option value="TODO">To Do</option>
              <option value="DONE">Done</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <FaPlus /> New Issue
          </button>
        </div>
      </div>

      {/* Issues Table */}
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Key</th>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assignee</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map((issue) => (
                <tr key={issue.id}>
                  <td>{getTypeIcon(issue.issueType)}</td>
                  <td style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{issue.issueKey}</td>
                  <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {issue.issueTitle}
                  </td>
                  <td>
                    <select
                      className={`badge ${getStatusBadge(issue.issueStatus)}`}
                      value={issue.issueStatus}
                      onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                      style={{ border: 'none', cursor: 'pointer', background: 'inherit' }}
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="IN_REVIEW">IN REVIEW</option>
                      <option value="TODO">TO DO</option>
                      <option value="DONE">DONE</option>
                      <option value="CLOSED">CLOSED</option>
                      <option value="RESOLVED">RESOLVED</option>
                      <option value="REOPEN">REOPEN</option>
                      <option value="BLOCKS">BLOCKED</option>
                    </select>
                  </td>
                  <td>
                    <span className={`badge ${getPriorityBadge(issue.issuePriority).class}`}>
                      {getPriorityBadge(issue.issuePriority).label}
                    </span>
                  </td>
                  <td>{issue.assignedEmail?.split('@')[0]}</td>
                  <td>{formatDate(issue.createdAt)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setSelectedIssue(issue)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredIssues.length === 0 && (
          <div className="empty-state">
            <FaBug style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--gray-300)' }} />
            <h3>No issues found</h3>
            <p>Create a new issue to get started</p>
          </div>
        )}
      </div>

      {/* Create Issue Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Issue">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Issue Title *</label>
            <input
              type="text"
              name="issueTitle"
              className="form-input"
              value={formData.issueTitle}
              onChange={handleInputChange}
              required
              placeholder="Enter issue title"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="issueDescription"
              className="form-textarea"
              value={formData.issueDescription}
              onChange={handleInputChange}
              placeholder="Describe the issue in detail"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select
                name="issueType"
                className="form-select"
                value={formData.issueType}
                onChange={handleInputChange}
              >
                <option value="BUG">Bug</option>
                <option value="STORY">Story</option>
                <option value="TASK">Task</option>
                <option value="EPIC">Epic</option>
                <option value="SUB_TASK">Sub-task</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                name="issuePriority"
                className="form-select"
                value={formData.issuePriority}
                onChange={handleInputChange}
              >
                <option value="HIGHEST">Highest</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
                <option value="LOWEST">Lowest</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Assignee Email</label>
              <input
                type="email"
                name="assignedEmail"
                className="form-input"
                value={formData.assignedEmail}
                onChange={handleInputChange}
                placeholder="assignee@example.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Reporter Email</label>
              <input
                type="email"
                name="reporterEmail"
                className="form-input"
                value={formData.reporterEmail}
                onChange={handleInputChange}
                placeholder="reporter@example.com"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Issue
            </button>
          </div>
        </form>
      </Modal>

      {/* View Issue Modal */}
      <Modal
        isOpen={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
        title={selectedIssue?.issueKey || 'Issue Details'}
      >
        {selectedIssue && (
          <div>
            <h3 style={{ marginBottom: '16px' }}>{selectedIssue.issueTitle}</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <strong>Type:</strong> {selectedIssue.issueType}
              </div>
              <div>
                <strong>Priority:</strong> {selectedIssue.issuePriority}
              </div>
              <div>
                <strong>Status:</strong> {selectedIssue.issueStatus}
              </div>
              <div>
                <strong>Assignee:</strong> {selectedIssue.assignedEmail || '-'}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <strong>Description:</strong>
              <p style={{ marginTop: '8px', color: 'var(--gray-600)' }}>
                {selectedIssue.issueDescription || 'No description provided'}
              </p>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedIssue(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Issues;

