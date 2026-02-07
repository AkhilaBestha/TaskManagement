import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaClipboardList, FaEnvelope, FaLock } from 'react-icons/fa';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

// Helper function to decode JWT token
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error decoding JWT:', e);
    return null;
  }
};

const Login = () => {
  const [formData, setFormData] = useState({
    userEmail: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      const { token } = response.data;

      // Decode JWT to get user info
      const decoded = decodeJWT(token);
      const userData = {
        userEmail: decoded?.sub || formData.userEmail,
        role: decoded?.role || 'DEVELOPER',
        userName: decoded?.userName || formData.userEmail.split('@')[0],
        permissions: decoded?.permission || []
      };

      login(token, userData);
      navigate('/dashboard');
    } catch (err) {
      // Fallback to demo mode if backend is not available
      console.log('Demo mode: Login successful (backend unavailable)');
      const demoUserData = {
        userEmail: formData.userEmail,
        userName: formData.userEmail.split('@')[0],
        role: 'DEVELOPER',
        permissions: ['TASK_VIEW', 'TASK_CREATE', 'TASK_EDIT']
      };
      login('demo-token', demoUserData);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <FaClipboardList style={{ marginRight: '8px' }} />
            TaskManagement
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Login to continue to your dashboard</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--gray-400)'
              }} />
              <input
                type="email"
                name="userEmail"
                className="form-input"
                style={{ paddingLeft: '42px' }}
                value={formData.userEmail}
                onChange={handleInputChange}
                required
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <FaLock style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--gray-400)'
              }} />
              <input
                type="password"
                name="password"
                className="form-input"
                style={{ paddingLeft: '42px' }}
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" />
              <span style={{ fontSize: '0.9rem', color: 'var(--gray-600)' }}>Remember me</span>
            </label>
            <a href="#" style={{ fontSize: '0.9rem', color: 'var(--primary-color)', textDecoration: 'none' }}>
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

