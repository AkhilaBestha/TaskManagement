import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTasks,
  FaThLarge,
  FaBug,
  FaRunning,
  FaUsers,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaClipboardList,
  FaBell,
  FaUserCircle
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const { unreadCount, toggleOpen } = useNotifications();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <NavLink to="/dashboard" className="sidebar-logo">
          <FaClipboardList />
          <span>TaskManagement</span>
        </NavLink>
        {/* Notification Icon */}
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button className="btn btn-secondary" style={{ position: 'relative', background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer' }} title="Notifications" onClick={toggleOpen}>
            <FaBell size={22} />
            {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: 'var(--danger-color)',
              color: 'white',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              fontSize: '0.7rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>{unreadCount}</span>
            )}
          </button>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FaChartLine />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/tasks" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FaTasks />
          <span>Tasks</span>
        </NavLink>

        <NavLink to="/boards" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FaThLarge />
          <span>Boards</span>
        </NavLink>

        <NavLink to="/issues" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FaBug />
          <span>Issues</span>
        </NavLink>

        <NavLink to="/sprints" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FaRunning />
          <span>Sprints</span>
        </NavLink>

        <div className="nav-section">
          <div className="nav-section-title">Management</div>

          <NavLink to="/team" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FaUsers />
            <span>Team</span>
          </NavLink>

          <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FaUserCircle />
            <span>Profile</span>
          </NavLink>

          <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <button className="nav-item" onClick={logout} style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

