// src/components/DoctorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { 
  FaUserInjured, FaCalendarAlt, FaFilePrescription,
  FaVideo, FaChartBar, FaBell, FaComments,
  FaClock, FaStethoscope, FaHospital
} from 'react-icons/fa';

const DoctorDashboard = () => {
  const { user } = useAuth();
  
  const [doctorStats, setDoctorStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    pendingPrescriptions: 0,
    monthlyEarnings: 0
  });
  
  const [todaysSchedule, setTodaysSchedule] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);

  useEffect(() => {
    loadDoctorData();
  }, []);

  const loadDoctorData = () => {
    // Mock data
    setDoctorStats({
      totalPatients: 124,
      todayAppointments: 8,
      pendingPrescriptions: 3,
      monthlyEarnings: 45000
    });
    
    setTodaysSchedule([
      { id: 1, patient: 'Abebe Kebede', time: '09:00 AM', type: 'Follow-up', status: 'confirmed' },
      { id: 2, patient: 'Meseret Alemu', time: '10:30 AM', type: 'New Patient', status: 'confirmed' },
      { id: 3, patient: 'Tigist Worku', time: '11:45 AM', type: 'Consultation', status: 'pending' },
      { id: 4, patient: 'Dawit Haile', time: '02:00 PM', type: 'Video Call', status: 'confirmed' }
    ]);
    
    setRecentPatients([
      { id: 1, name: 'Abebe Kebede', lastVisit: '2 days ago', condition: 'Hypertension', nextAppointment: 'Tomorrow' },
      { id: 2, name: 'Meseret Alemu', lastVisit: '1 week ago', condition: 'Diabetes', nextAppointment: 'Next month' },
      { id: 3, name: 'Tigist Worku', lastVisit: '3 days ago', condition: 'Migraine', nextAppointment: 'Next week' }
    ]);
  };

  return (
    <div className="doctor-dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Dr. {user?.name?.split(' ').pop() || 'Doctor'}</h1>
          <p>{user?.specialty || 'Medical Specialist'} • {user?.hospital || 'Hospital'}</p>
        </div>
        
        <div className="header-actions">
          <button className="btn btn-primary">
            <FaVideo /> Start Video Consult
          </button>
          <button className="btn btn-secondary">
            <FaCalendarAlt /> Schedule
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon patients">
            <FaUserInjured />
          </div>
          <div className="stat-info">
            <h3>{doctorStats.totalPatients}</h3>
            <p>Total Patients</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon appointments">
            <FaCalendarAlt />
          </div>
          <div className="stat-info">
            <h3>{doctorStats.todayAppointments}</h3>
            <p>Today's Appointments</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon prescriptions">
            <FaFilePrescription />
          </div>
          <div className="stat-info">
            <h3>{doctorStats.pendingPrescriptions}</h3>
            <p>Pending Prescriptions</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon earnings">
            <FaChartBar />
          </div>
          <div className="stat-info">
            <h3>ETB {doctorStats.monthlyEarnings.toLocaleString()}</h3>
            <p>Monthly Earnings</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-columns">
          {/* Today's Schedule */}
          <div className="column">
            <div className="card">
              <div className="card-header">
                <h3>Today's Schedule</h3>
                <button className="btn btn-text">View All</button>
              </div>
              <div className="schedule-list">
                {todaysSchedule.map(appointment => (
                  <div key={appointment.id} className="schedule-item">
                    <div className="appointment-time">
                      <FaClock />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="appointment-details">
                      <h4>{appointment.patient}</h4>
                      <p>{appointment.type}</p>
                    </div>
                    <span className={`appointment-status ${appointment.status}`}>
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card quick-actions-card">
              <h3>Quick Actions</h3>
              <div className="quick-actions">
                <button className="btn btn-outline">
                  <FaFilePrescription /> Write Prescription
                </button>
                <button className="btn btn-outline">
                  <FaComments /> Message Patient
                </button>
                <button className="btn btn-outline">
                  <FaStethoscope /> Virtual Consult
                </button>
                <button className="btn btn-outline">
                  <FaHospital /> Refer to Specialist
                </button>
              </div>
            </div>
          </div>

          {/* Recent Patients */}
          <div className="column">
            <div className="card">
              <div className="card-header">
                <h3>Recent Patients</h3>
                <button className="btn btn-text">View All</button>
              </div>
              <div className="patients-list">
                {recentPatients.map(patient => (
                  <div key={patient.id} className="patient-item">
                    <div className="patient-avatar">
                      {patient.name.charAt(0)}
                    </div>
                    <div className="patient-info">
                      <h4>{patient.name}</h4>
                      <p>{patient.condition}</p>
                      <div className="patient-meta">
                        <span>Last visit: {patient.lastVisit}</span>
                        <span>Next: {patient.nextAppointment}</span>
                      </div>
                    </div>
                    <button className="btn btn-text">View</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="card notifications-card">
              <div className="card-header">
                <h3>Notifications</h3>
                <FaBell />
              </div>
              <div className="notifications-list">
                <div className="notification-item">
                  <div className="notification-icon urgent">
                    <FaBell />
                  </div>
                  <div className="notification-content">
                    <p>Emergency consult requested</p>
                    <span>5 minutes ago</span>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-icon info">
                    <FaComments />
                  </div>
                  <div className="notification-content">
                    <p>New lab results available</p>
                    <span>2 hours ago</span>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-icon success">
                    <FaCalendarAlt />
                  </div>
                  <div className="notification-content">
                    <p>Appointment confirmed for tomorrow</p>
                    <span>1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;