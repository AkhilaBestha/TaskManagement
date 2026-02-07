import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaSearch } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import NotificationDropdown from './NotificationDropdown';

const Header = ({ title, subtitle }) => {
  const { user } = useAuth();
  const { unreadCount, toggleOpen } = useNotifications();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatRole = (role) => {
    if (!role) return 'Member';
    return role.charAt(0) + role.slice(1).toLowerCase();
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header className="header">
      <div className="header-title">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="header-actions">
        <div className="search-box" style={{ position: 'relative' }}>
          <FaSearch style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--gray-400)'
          }} />
          <input
            type="text"
            placeholder="Search..."
            className="form-input"
            style={{ paddingLeft: '40px', width: '250px' }}
          />
        </div>

        <div className="notification-wrapper" style={{ position: 'relative' }}>
          <button className="btn btn-secondary" onClick={toggleOpen}>
            <FaBell />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
          <NotificationDropdown />
        </div>

        <div className="user-profile" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <div className="user-avatar">
            {getInitials(user?.userName || user?.userEmail)}
          </div>
          <div className="user-info">
            <div className="user-name">{user?.userName || 'User'}</div>
            <div className="user-role">{formatRole(user?.role)}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
