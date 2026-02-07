import React, { useState, useEffect } from 'react';
import { FaPlus, FaPlay, FaStop, FaChartLine } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Header from '../components/Header';
import Modal from '../components/Modal';
import { sprintAPI } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Sprints = () => {
  const [sprints, setSprints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showBurndown, setShowBurndown] = useState(false);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchSprints();
  }, []);

  const fetchSprints = async () => {
    setLoading(false);
    // Mock data for demo
    setSprints([
      {
        id: 1,
        name: 'Sprint 1',
        goal: 'Complete user authentication module',
        startDate: '2026-01-06',
        endDate: '2026-01-20',
        state: 'ACTIVE',
        totalPoints: 40,
        completedPoints: 28,
        issues: 12
      },
      {
        id: 2,
        name: 'Sprint 2',
        goal: 'Implement dashboard features',
        startDate: '2026-01-20',
        endDate: '2026-02-03',
        state: 'FUTURE',
        totalPoints: 35,
        completedPoints: 0,
        issues: 8
      },
      {
        id: 3,
        name: 'Sprint 0 - Setup',
        goal: 'Project setup and configuration',
        startDate: '2025-12-23',
        endDate: '2026-01-05',
        state: 'CLOSED',
        totalPoints: 25,
        completedPoints: 25,
        issues: 6
      },
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sprintAPI.createSprint(formData);
      fetchSprints();
    } catch (error) {
      const newSprint = {
        id: Date.now(),
        ...formData,
        state: 'FUTURE',
        totalPoints: 0,
        completedPoints: 0,
        issues: 0
      };
      setSprints(prev => [...prev, newSprint]);
    }
    setShowModal(false);
    setFormData({ name: '', goal: '', startDate: '', endDate: '' });
  };

  const handleStartSprint = async (sprintId) => {
    try {
      await sprintAPI.startSprint(sprintId);
      fetchSprints();
    } catch (error) {
      setSprints(prev => prev.map(s => s.id === sprintId ? { ...s, state: 'ACTIVE' } : s));
    }
  };

  const handleCloseSprint = async (sprintId) => {
    try {
      await sprintAPI.closeSprint(sprintId);
      fetchSprints();
    } catch (error) {
      setSprints(prev => prev.map(s => s.id === sprintId ? { ...s, state: 'CLOSED' } : s));
    }
  };

  const openBurndown = (sprint) => {
    setSelectedSprint(sprint);
    setShowBurndown(true);
  };

  const getStateBadge = (state) => {
    switch (state) {
      case 'ACTIVE': return { class: 'badge-in-progress', label: 'Active' };
      case 'FUTURE': return { class: 'badge-open', label: 'Future' };
      case 'CLOSED': return { class: 'badge-complete', label: 'Closed' };
      default: return { class: 'badge-open', label: state };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const burndownData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'],
    datasets: [
      {
        label: 'Ideal',
        data: [40, 36, 32, 28, 24, 20, 16, 12, 8, 0],
        borderColor: '#9ca3af',
        borderDash: [5, 5],
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Actual',
        data: [40, 38, 35, 30, 28, 24, 20, 16, 12, null],
        borderColor: '#4f46e5',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sprint Burndown Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Story Points',
        },
      },
    },
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
        title="Sprints"
        subtitle="Plan and track sprint progress"
      />

      {/* Actions Bar */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="flex-between">
          <div className="flex gap-2">
            <span style={{ fontWeight: 600, color: 'var(--gray-600)' }}>
              {sprints.filter(s => s.state === 'ACTIVE').length} Active Sprint(s)
            </span>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <FaPlus /> New Sprint
          </button>
        </div>
      </div>

      {/* Sprints Grid */}
      <div style={{ display: 'grid', gap: '20px' }}>
        {sprints.map((sprint) => (
          <div key={sprint.id} className="card">
            <div className="flex-between" style={{ marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '4px' }}>
                  {sprint.name}
                </h3>
                <span className={`badge ${getStateBadge(sprint.state).class}`}>
                  {getStateBadge(sprint.state).label}
                </span>
              </div>
              <div className="flex gap-2">
                {sprint.state === 'FUTURE' && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleStartSprint(sprint.id)}
                  >
                    <FaPlay /> Start Sprint
                  </button>
                )}
                {sprint.state === 'ACTIVE' && (
                  <>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => openBurndown(sprint)}
                    >
                      <FaChartLine /> Burndown
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleCloseSprint(sprint.id)}
                    >
                      <FaStop /> Complete Sprint
                    </button>
                  </>
                )}
                {sprint.state === 'CLOSED' && (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => openBurndown(sprint)}
                  >
                    <FaChartLine /> View Report
                  </button>
                )}
              </div>
            </div>

            <p style={{ color: 'var(--gray-600)', marginBottom: '16px' }}>
              {sprint.goal}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Duration</div>
                <div style={{ fontWeight: 600 }}>
                  {formatDate(sprint.startDate)} - {formatDate(sprint.endDate)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Issues</div>
                <div style={{ fontWeight: 600 }}>{sprint.issues}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Progress</div>
                <div style={{ fontWeight: 600 }}>
                  {sprint.completedPoints} / {sprint.totalPoints} points
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: '4px' }}>Completion</div>
                <div style={{
                  background: 'var(--gray-200)',
                  borderRadius: '10px',
                  height: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: sprint.state === 'CLOSED' ? 'var(--success-color)' : 'var(--primary-color)',
                    height: '100%',
                    width: `${(sprint.completedPoints / sprint.totalPoints) * 100}%`,
                    borderRadius: '10px',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sprints.length === 0 && (
        <div className="card">
          <div className="empty-state">
            <FaPlay style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--gray-300)' }} />
            <h3>No sprints yet</h3>
            <p>Create your first sprint to start planning</p>
          </div>
        </div>
      )}

      {/* Create Sprint Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Sprint">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Sprint Name *</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g., Sprint 3"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Sprint Goal</label>
            <textarea
              name="goal"
              className="form-textarea"
              value={formData.goal}
              onChange={handleInputChange}
              placeholder="What do you want to achieve in this sprint?"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="form-input"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="endDate"
                className="form-input"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Sprint
            </button>
          </div>
        </form>
      </Modal>

      {/* Burndown Chart Modal */}
      <Modal
        isOpen={showBurndown}
        onClose={() => setShowBurndown(false)}
        title={`${selectedSprint?.name} - Burndown Chart`}
      >
        <div style={{ height: '300px' }}>
          <Line data={burndownData} options={chartOptions} />
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowBurndown(false)}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Sprints;

