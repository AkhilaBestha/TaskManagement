import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaUserTag, FaShieldAlt, FaEdit, FaSave, FaTimes, FaKey } from 'react-icons/fa';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.userName || '',
    userEmail: user?.userEmail || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would call an API to update user profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Here you would call an API to change password
    console.log('Changing password');
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const getRoleBadgeClass = (role) => {
    const roleClasses = {
      ADMIN: 'badge-admin',
      MANAGER: 'badge-manager',
      DEVELOPER: 'badge-developer',
      TESTER: 'badge-tester',
      DEVOPS: 'badge-devops'
    };
    return roleClasses[role] || 'badge-default';
  };

  const formatRole = (role) => {
    if (!role) return 'Member';
    return role.charAt(0) + role.slice(1).toLowerCase();
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <main className="main-content">
      <Header title="Profile" subtitle="Manage your account settings" />

      <div className="profile-container">
        {/* Profile Header Card */}
        <div className="card profile-header-card">
          <div className="profile-header-content">
            <div className="profile-avatar-large">
              {getInitials(user?.userName || user?.userEmail)}
            </div>
            <div className="profile-header-info">
              <h2 className="profile-name">{user?.userName || 'User'}</h2>
              <p className="profile-email">{user?.userEmail || 'user@example.com'}</p>
              <span className={`badge ${getRoleBadgeClass(user?.role)}`}>
                {formatRole(user?.role)}
              </span>
            </div>
            <div className="profile-actions">
              {!isEditing ? (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="btn btn-success" onClick={handleSave}>
                    <FaSave /> Save
                  </button>
                  <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="profile-grid">
          {/* Personal Information */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <FaUser style={{ marginRight: '8px', color: 'var(--primary-color)' }} />
                Personal Information
              </h3>
            </div>
            <div className="profile-info-list">
              <div className="profile-info-item">
                <label className="profile-label">
                  <FaUser className="label-icon" /> Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="userName"
                    className="form-input"
                    value={formData.userName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="profile-value">{user?.userName || 'Not set'}</p>
                )}
              </div>
              <div className="profile-info-item">
                <label className="profile-label">
                  <FaEnvelope className="label-icon" /> Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="userEmail"
                    className="form-input"
                    value={formData.userEmail}
                    onChange={handleInputChange}
                    disabled
                  />
                ) : (
                  <p className="profile-value">{user?.userEmail || 'Not set'}</p>
                )}
              </div>
              <div className="profile-info-item">
                <label className="profile-label">
                  <FaUserTag className="label-icon" /> Role
                </label>
                <p className="profile-value">{formatRole(user?.role)}</p>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <FaShieldAlt style={{ marginRight: '8px', color: 'var(--primary-color)' }} />
                Security
              </h3>
            </div>
            <div className="security-section">
              <div className="security-item">
                <div className="security-info">
                  <h4>Password</h4>
                  <p>Last changed: Never</p>
                </div>
                <button
                  className="btn btn-outline"
                  onClick={() => setShowPasswordModal(true)}
                >
                  <FaKey /> Change Password
                </button>
              </div>
              <div className="security-item">
                <div className="security-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Not enabled</p>
                </div>
                <button className="btn btn-secondary" disabled>
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>

          {/* Permissions */}
          {user?.permissions && user.permissions.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <FaShieldAlt style={{ marginRight: '8px', color: 'var(--primary-color)' }} />
                  Permissions
                </h3>
              </div>
              <div className="permissions-grid">
                {user.permissions.map((permission, index) => (
                  <span key={index} className="permission-badge">
                    {permission.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Change Password</h3>
              <button className="modal-close" onClick={() => setShowPasswordModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  className="form-input"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-input"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Profile;

