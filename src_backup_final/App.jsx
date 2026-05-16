// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { AgentProvider } from './AgentContext';
import { VoiceProvider } from './VoiceContext';
import { NotificationProvider } from './NotificationContext';
import MedAI from './components/MedAI';
import Dashboard from './components/Dashboard';
import DoctorDashboard from './components/DoctorDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import ClerkDashboard from './components/ClerkDashboard';
import PatientHistory from './components/PatientHistory';
import VideoCall from './components/VideoCall';
import RadiologyAnalyzer from './components/RadiologyAnalyzer';
import DrugChecker from './components/DrugChecker';
import VoiceAssistant from './components/VoiceAssistant';
import MultimodalAssistant from './components/MultimodalAssistant';
import EthiopiaMap from './components/EthiopiaMap';
import LiveRecommendations from './components/LiveRecommendations';
import RealtimeUpdates from './components/RealtimeUpdates';
import RightDoctorBar from './components/RightDoctorBar';
import './App.css';

function App() {
  return (
    <Router>
      <NotificationProvider>
        <VoiceProvider>
          <AgentProvider>
            <AuthProvider>
              <div className="app-container">
                <Routes>
                  <Route path="/" element={<MedAI />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/doctor" element={<DoctorDashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/professional" element={<ProfessionalDashboard />} />
                  <Route path="/clerk" element={<ClerkDashboard />} />
                  <Route path="/history" element={<PatientHistory />} />
                  <Route path="/video-call" element={<VideoCall />} />
                  <Route path="/radiology" element={<RadiologyAnalyzer />} />
                  <Route path="/drug-checker" element={<DrugChecker />} />
                  <Route path="/voice-assistant" element={<VoiceAssistant />} />
                  <Route path="/multimodal" element={<MultimodalAssistant />} />
                  <Route path="/ethiopia-map" element={<EthiopiaMap />} />
                  <Route path="/live-recommendations" element={<LiveRecommendations />} />
                  <Route path="/realtime-updates" element={<RealtimeUpdates />} />
                  <Route path="/right-doctor" element={<RightDoctorBar />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </AuthProvider>
          </AgentProvider>
        </VoiceProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;