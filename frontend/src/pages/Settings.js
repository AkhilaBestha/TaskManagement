import React, { useState } from 'react';
import { FaSave, FaBell, FaPalette, FaShieldAlt, FaDatabase } from 'react-icons/fa';
import Header from '../components/Header';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      taskReminders: true,
      sprintUpdates: true,
      teamMentions: true
    },
    display: {
      theme: 'light',
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      timezone: 'UTC'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30'
    }
  });

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleDisplayChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [key]: value
      }
    }));
  };

  const handleSecurityChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: typeof value === 'boolean' ? !prev.security[key] : value
      }
    }));
  };

  const handleSave = () => {
    // Save settings to backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="main-content">
      <Header
        title="Settings"
        subtitle="Manage your account preferences"
      />

      <div style={{ display: 'grid', gap: '24px', maxWidth: '800px' }}>
        {/* Notifications */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '20px' }}>
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaBell style={{ color: 'var(--primary-color)' }} />
              Notifications
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries({
              emailNotifications: 'Email Notifications',
              taskReminders: 'Task Reminders',
              sprintUpdates: 'Sprint Updates',
              teamMentions: 'Team Mentions'
            }).map(([key, label]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--gray-700)' }}>{label}</span>
                <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
                  <input
                    type="checkbox"
                    checked={settings.notifications[key]}
                    onChange={() => handleNotificationChange(key)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: settings.notifications[key] ? 'var(--primary-color)' : 'var(--gray-300)',
                    transition: '0.3s',
                    borderRadius: '26px'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '',
                      height: '20px',
                      width: '20px',
                      left: settings.notifications[key] ? '26px' : '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      transition: '0.3s',
                      borderRadius: '50%'
                    }}></span>
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Display Settings */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '20px' }}>
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaPalette style={{ color: 'var(--primary-color)' }} />
              Display
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Theme</label>
              <select
                className="form-select"
                value={settings.display.theme}
                onChange={(e) => handleDisplayChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">System Default</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Language</label>
              <select
                className="form-select"
                value={settings.display.language}
                onChange={(e) => handleDisplayChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date Format</label>
              <select
                className="form-select"
                value={settings.display.dateFormat}
                onChange={(e) => handleDisplayChange('dateFormat', e.target.value)}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Timezone</label>
              <select
                className="form-select"
                value={settings.display.timezone}
                onChange={(e) => handleDisplayChange('timezone', e.target.value)}
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time (EST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="IST">India Standard Time (IST)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '20px' }}>
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaShieldAlt style={{ color: 'var(--primary-color)' }} />
              Security
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', color: 'var(--gray-700)' }}>Two-Factor Authentication</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>Add an extra layer of security</div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={() => handleSecurityChange('twoFactorAuth', true)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: settings.security.twoFactorAuth ? 'var(--primary-color)' : 'var(--gray-300)',
                  transition: '0.3s',
                  borderRadius: '26px'
                }}>
                  <span style={{
                    position: 'absolute',
                    height: '20px',
                    width: '20px',
                    left: settings.security.twoFactorAuth ? '26px' : '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    transition: '0.3s',
                    borderRadius: '50%'
                  }}></span>
                </span>
              </label>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Session Timeout (minutes)</label>
              <select
                className="form-select"
                style={{ maxWidth: '200px' }}
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '20px' }}>
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaDatabase style={{ color: 'var(--primary-color)' }} />
              API Configuration
            </h3>
          </div>

          <div className="form-group">
            <label className="form-label">Backend API URL</label>
            <input
              type="text"
              className="form-input"
              value="http://localhost:8087/api"
              readOnly
              style={{ backgroundColor: 'var(--gray-100)' }}
            />
          </div>
        </div>

        {/* Save Button */}
        <button className="btn btn-primary" onClick={handleSave} style={{ width: 'fit-content' }}>
          <FaSave /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;

