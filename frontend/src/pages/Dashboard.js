import React, { useState, useEffect } from 'react';
import { FaTasks, FaCheckCircle, FaClock, FaBan, FaPlus, FaChartPie } from 'react-icons/fa';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Header from '../components/Header';
import { taskAPI } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    complete: 0,
    blocked: 0
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getAllTasks();
      const tasksData = response.data || [];
      setTasks(tasksData);

      // Calculate stats
      const statsData = {
        total: tasksData.length,
        open: tasksData.filter(t => t.taskStatus === 'OPEN').length,
        inProgress: tasksData.filter(t => t.taskStatus === 'IN_PROGRESS').length,
        complete: tasksData.filter(t => t.taskStatus === 'COMPLETE').length,
        blocked: tasksData.filter(t => t.taskStatus === 'BLOCK').length
      };
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Use mock data for demo
      const mockTasks = [
        { taskTitle: 'Design Homepage', taskStatus: 'IN_PROGRESS', priority: 'HIGH', assignedToEmail: 'john@example.com', dueDate: '2026-01-20' },
        { taskTitle: 'API Integration', taskStatus: 'OPEN', priority: 'MEDIUM', assignedToEmail: 'jane@example.com', dueDate: '2026-01-22' },
        { taskTitle: 'Database Setup', taskStatus: 'COMPLETE', priority: 'HIGH', assignedToEmail: 'mike@example.com', dueDate: '2026-01-18' },
        { taskTitle: 'User Authentication', taskStatus: 'IN_PROGRESS', priority: 'HIGH', assignedToEmail: 'sarah@example.com', dueDate: '2026-01-25' },
        { taskTitle: 'Testing Module', taskStatus: 'OPEN', priority: 'LOW', assignedToEmail: 'john@example.com', dueDate: '2026-01-28' },
      ];
      setTasks(mockTasks);
      setStats({
        total: 5,
        open: 2,
        inProgress: 2,
        complete: 1,
        blocked: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const doughnutData = {
    labels: ['Open', 'In Progress', 'Complete', 'Blocked'],
    datasets: [
      {
        data: [stats.open, stats.inProgress, stats.complete, stats.blocked],
        backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'],
        borderColor: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [3, 5, 2, 8, 4, 6, 3],
        backgroundColor: '#4f46e5',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

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
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your projects."
      />

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-icon primary">
            <FaTasks />
          </div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Tasks</p>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon warning">
            <FaClock />
          </div>
          <div className="stat-info">
            <h3>{stats.inProgress}</h3>
            <p>In Progress</p>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon success">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <h3>{stats.complete}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon danger">
            <FaBan />
          </div>
          <div className="stat-info">
            <h3>{stats.blocked}</h3>
            <p>Blocked</p>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Recent Tasks */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Tasks</h3>
            <button className="btn btn-primary btn-sm">
              <FaPlus /> Add Task
            </button>
          </div>

          <ul className="task-list">
            {tasks.slice(0, 5).map((task, index) => (
              <li key={index} className="task-item">
                <div className="task-info">
                  <div className="task-title">{task.taskTitle}</div>
                  <div className="task-meta">
                    <span className={`badge ${getStatusBadge(task.taskStatus)}`}>
                      {task.taskStatus?.replace('_', ' ')}
                    </span>
                    <span className={`badge ${getPriorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span>{formatDate(task.dueDate)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Charts */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Task Distribution</h3>
          </div>
          <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Doughnut data={doughnutData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="card" style={{ marginTop: '24px' }}>
        <div className="card-header">
          <h3 className="card-title">Weekly Progress</h3>
        </div>
        <div style={{ height: '300px' }}>
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

