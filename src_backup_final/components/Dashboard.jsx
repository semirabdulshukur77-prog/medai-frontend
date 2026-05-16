// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useAgent } from '../AgentContext';
import { useNotification } from '../NotificationContext';
import { 
  FaUser, FaCalendarCheck, FaFileMedical, FaPills,
  FaChartLine, FaBell, FaHistory, FaVideo,
  FaUserMd, FaHospital, FaAmbulance, FaShieldAlt
} from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const { getAgentStats } = useAgent();
  const { notifications, unreadCount, markAllAsRead } = useNotification();
  
  const [stats, setStats] = useState({
    consultations: 0,
    appointments: 0,
    prescriptions: 0,
    healthScore: 0
  });
  
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    // Load dashboard data
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Mock data - replace with API calls
    setStats({
      consultations: 12,
      appointments: 3,
      prescriptions: 5,
      healthScore: 85
    });
    
    setRecentActivities([
      { id: 1, type: 'consultation', title: 'AI Consultation', description: 'Headache analysis completed', time: '2 hours ago' },
      { id: 2, type: 'appointment', title: 'Doctor Appointment', description: 'Scheduled with Dr. Alemayehu', time: '1 day ago' },
      { id: 3, type: 'prescription', title: 'Prescription', description: 'New medication prescribed', time: '2 days ago' },
      { id: 4, type: 'test', title: 'Lab Results', description: 'Blood test results received', time: '3 days ago' }
    ]);
    
    setUpcomingAppointments([
      { id: 1, doctor: 'Dr. Sophia Mekonnen', specialty: 'Neurologist', date: 'Tomorrow, 10:00 AM', status: 'confirmed' },
      { id: 2, doctor: 'Dr. Yohannes Assefa', specialty: 'Pediatrician', date: 'Dec 28, 2:00 PM', status: 'pending' }
    ]);
  };

  const agentStats = getAgentStats();

  const quickActions = [
    { icon: <FaUserMd />, label: 'Find Doctor', action: () => navigate('/right-doctor') },
    { icon: <FaVideo />, label: 'Video Consult', action: () => navigate('/video-call') },
    { icon: <FaFileMedical />, label: 'Medical History', action: () => navigate('/history') },
    { icon: <FaPills />, label: 'Drug Checker', action: () => navigate('/drug-checker') },
    { icon: <FaCalendarCheck />, label: 'Book Appointment', action: () => window.alert('Booking system coming soon!') },
    { icon: <FaAmbulance />, label: 'Emergency', action: () => window.location.href = 'tel:911' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name || 'User'}!</h1>
          <p>Here's your health summary and recent activities</p>
        </div>
        
        <div className="header-actions">
          <button 
            className="btn btn-secondary notification-btn"
            onClick={() => markAllAsRead()}
          >
            <FaBell />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon consultation">
              <FaUserMd />
            </div>
            <div className="stat-info">
              <h3>{stats.consultations}</h3>
              <p>Consultations</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon appointment">
              <FaCalendarCheck />
            </div>
            <div className="stat-info">
              <h3>{stats.appointments}</h3>
              <p>Appointments</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon prescription">
              <FaPills />
            </div>
            <div className="stat-info">
              <h3>{stats.prescriptions}</h3>
              <p>Prescriptions</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon health">
              <FaChartLine />
            </div>
            <div className="stat-info">
              <h3>{stats.healthScore}%</h3>
              <p>Health Score</p>
            </div>
          </div>
        </div>

        {/* Agent Stats */}
        <div className="agent-stats-card">
          <h3>AI Agent Performance</h3>
          <div className="agent-stats">
            <div className="agent-stat">
              <span className="stat-label">Active Agents</span>
              <span className="stat-value">{agentStats.activeAgents}</span>
            </div>
            <div className="agent-stat">
              <span className="stat-label">Total Queries</span>
              <span className="stat-value">{agentStats.totalQueries}</span>
            </div>
            <div className="agent-stat">
              <span className="stat-label">Avg Confidence</span>
              <span className="stat-value">{agentStats.avgConfidence}%</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-btn"
                onClick={action.action}
              >
                <div className="action-icon">{action.icon}</div>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="dashboard-columns">
          {/* Left Column - Recent Activities */}
          <div className="column">
            <div className="card">
              <div className="card-header">
                <h3>Recent Activities</h3>
                <button 
                  className="btn btn-text"
                  onClick={() => navigate('/history')}
                >
                  View All
                </button>
              </div>
              <div className="activities-list">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                      {activity.type === 'consultation' && <FaUserMd />}
                      {activity.type === 'appointment' && <FaCalendarCheck />}
                      {activity.type === 'prescription' && <FaPills />}
                      {activity.type === 'test' && <FaFileMedical />}
                    </div>
                    <div className="activity-info">
                      <h4>{activity.title}</h4>
                      <p>{activity.description}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Upcoming Appointments */}
          <div className="column">
            <div className="card">
              <div className="card-header">
                <h3>Upcoming Appointments</h3>
                <button 
                  className="btn btn-text"
                  onClick={() => window.alert('View all appointments')}
                >
                  View All
                </button>
              </div>
              <div className="appointments-list">
                {upcomingAppointments.map(appointment => (
                  <div key={appointment.id} className="appointment-item">
                    <div className="appointment-info">
                      <h4>{appointment.doctor}</h4>
                      <p>{appointment.specialty}</p>
                      <span className="appointment-date">{appointment.date}</span>
                    </div>
                    <span className={`appointment-status ${appointment.status}`}>
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Tips */}
            <div className="card health-tips">
              <div className="card-header">
                <h3>Health Tips</h3>
              </div>
              <div className="tips-list">
                <div className="tip-item">
                  <FaShieldAlt />
                  <p>Stay hydrated - Drink at least 8 glasses of water daily</p>
                </div>
                <div className="tip-item">
                  <FaShieldAlt />
                  <p>Regular exercise improves both physical and mental health</p>
                </div>
                <div className="tip-item">
                  <FaShieldAlt />
                  <p>Get 7-8 hours of sleep for optimal health</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;