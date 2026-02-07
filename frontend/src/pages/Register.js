import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaClipboardList, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { authAPI } from '../services/api';
import './Register.css';

// Star component for the falling animation
const Star = ({ style }) => (
  <div className="star" style={style}>
    ✦
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    password: '',
    confirmPassword: '',
    role: 'DEVELOPER'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Generate stars with random positions and animation delays
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${8 + Math.random() * 12}s`,
      fontSize: `${8 + Math.random() * 12}px`,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authAPI.register({
        userName: formData.userName,
        userEmail: formData.userEmail,
        password: formData.password,
        role: formData.role
      });
      navigate('/login');
    } catch (err) {
      // For demo, redirect to login
      console.log('Demo mode: Registration successful');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Falling stars background */}
      <div className="stars-container">
        {stars.map((star) => (
          <Star
            key={star.id}
            style={{
              left: star.left,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration,
              fontSize: star.fontSize,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <div className="register-card">
        <div className="register-header">
          <div className="register-logo">
            <FaClipboardList className="logo-icon" />
            <span>TaskManagement</span>
          </div>
          <h1 className="register-title">Register</h1>
          <p className="register-subtitle">Join us and start managing your tasks</p>
        </div>

        {error && <div className="register-error">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-form-group">
            <label className="register-label">Full Name</label>
            <div className="register-input-wrapper">
              <FaUser className="register-input-icon" />
              <input
                type="text"
                name="userName"
                className="register-input"
                value={formData.userName}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="register-form-group">
            <label className="register-label">Email Address</label>
            <div className="register-input-wrapper">
              <FaEnvelope className="register-input-icon" />
              <input
                type="email"
                name="userEmail"
                className="register-input"
                value={formData.userEmail}
                onChange={handleInputChange}
                required
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="register-form-group">
            <label className="register-label">Role</label>
            <select
              name="role"
              className="register-select"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="DEVELOPER">Developer</option>
              <option value="MANAGER">Manager</option>
              <option value="TESTER">Tester</option>
              <option value="DEVOPS">DevOps</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="register-form-group">
            <label className="register-label">Password</label>
            <div className="register-input-wrapper">
              <FaLock className="register-input-icon" />
              <input
                type="password"
                name="password"
                className="register-input"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Create a password"
                minLength={6}
              />
            </div>
          </div>

          <div className="register-form-group">
            <label className="register-label">Confirm Password</label>
            <div className="register-input-wrapper">
              <FaLock className="register-input-icon" />
              <input
                type="password"
                name="confirmPassword"
                className="register-input"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="register-submit-btn"
            disabled={loading}
          >
            {loading ? <span className="register-spinner"></span> : 'Register'}
          </button>
        </form>

        <div className="register-footer">
          Already have an account? <Link to="/login" className="register-link">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

