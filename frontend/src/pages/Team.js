import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaBriefcase, FaUsers } from 'react-icons/fa';
import Header from '../components/Header';

const Team = () => {
  const [teamMembers] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'DEVELOPER', status: 'Active', avatar: 'JS', tasks: 12 },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'MANAGER', status: 'Active', avatar: 'JD', tasks: 8 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'DEVELOPER', status: 'Active', avatar: 'MJ', tasks: 15 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'TESTER', status: 'Active', avatar: 'SW', tasks: 10 },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 'DEVOPS', status: 'Away', avatar: 'DB', tasks: 6 },
    { id: 6, name: 'Emily Clark', email: 'emily@example.com', role: 'DEVELOPER', status: 'Active', avatar: 'EC', tasks: 9 },
  ]);

  const getRoleBadge = (role) => {
    const roleMap = {
      'ADMIN': { class: 'badge-high', color: '#ef4444' },
      'MANAGER': { class: 'badge-in-progress', color: '#8b5cf6' },
      'DEVELOPER': { class: 'badge-open', color: '#3b82f6' },
      'TESTER': { class: 'badge-medium', color: '#f59e0b' },
      'DEVOPS': { class: 'badge-complete', color: '#10b981' }
    };
    return roleMap[role] || { class: 'badge-open', color: '#6b7280' };
  };

  return (
    <div className="main-content">
      <Header
        title="Team"
        subtitle="Manage your team members"
      />

      {/* Team Stats */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="card stat-card">
          <div className="stat-icon primary">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>{teamMembers.length}</h3>
            <p>Total Members</p>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon success">
            <FaUser />
          </div>
          <div className="stat-info">
            <h3>{teamMembers.filter(m => m.status === 'Active').length}</h3>
            <p>Active Now</p>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon warning">
            <FaBriefcase />
          </div>
          <div className="stat-info">
            <h3>{teamMembers.reduce((acc, m) => acc + m.tasks, 0)}</h3>
            <p>Assigned Tasks</p>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {teamMembers.map(member => (
          <div key={member.id} className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: getRoleBadge(member.role).color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: '600'
              }}>
                {member.avatar}
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px' }}>
                  {member.name}
                </h3>
                <span className={`badge ${getRoleBadge(member.role).class}`}>
                  {member.role}
                </span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <FaEnvelope style={{ color: 'var(--gray-400)' }} />
                <span style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>{member.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--gray-500)' }}>
                  {member.tasks} tasks assigned
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.85rem'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: member.status === 'Active' ? 'var(--success-color)' : 'var(--warning-color)'
                  }}></span>
                  {member.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;

