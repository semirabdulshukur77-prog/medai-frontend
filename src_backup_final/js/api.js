// src/js/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('medai_token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('medai_token', token);
    } else {
      localStorage.removeItem('medai_token');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config = {
      ...options,
      headers
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: `HTTP ${response.status}: ${response.statusText}`
        }));
        throw new Error(error.message || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Authentication
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST'
    });
  }

  // Medical Consultation
  async analyzeSymptoms(data) {
    return this.request('/consultation/analyze', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async findDoctors(criteria) {
    return this.request('/doctors/find', {
      method: 'POST',
      body: JSON.stringify(criteria)
    });
  }

  async bookAppointment(appointmentData) {
    return this.request('/appointments/book', {
      method: 'POST',
      body: JSON.stringify(appointmentData)
    });
  }

  // Medical Records
  async getPatientHistory(patientId) {
    return this.request(`/patients/${patientId}/history`);
  }

  async updateMedicalRecord(recordId, data) {
    return this.request(`/records/${recordId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // Prescriptions
  async checkDrugInteractions(drugs) {
    return this.request('/drugs/interactions', {
      method: 'POST',
      body: JSON.stringify({ drugs })
    });
  }

  async getPrescriptionHistory() {
    return this.request('/prescriptions/history');
  }

  // AI Agents
  async queryAgent(agentName, query) {
    return this.request('/agents/query', {
      method: 'POST',
      body: JSON.stringify({ agent: agentName, query })
    });
  }

  async getAgentStatus() {
    return this.request('/agents/status');
  }

  // File Upload (for radiology, etc.)
  async uploadMedicalImage(file, type) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.request('/upload/image', {
      method: 'POST',
      headers: {
        // Let browser set Content-Type for FormData
      },
      body: formData
    });
  }

  // Real-time Updates (WebSocket)
  async getRealtimeUpdates() {
    return this.request('/updates/realtime');
  }

  // Analytics
  async getDashboardStats() {
    return this.request('/analytics/dashboard');
  }

  // Ethiopian Medical Data
  async getEthiopianMedicalData() {
    return this.request('/data/ethiopia');
  }

  // Emergency Services
  async requestEmergencyAssistance(data) {
    return this.request('/emergency/request', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // Voice Processing
  async processVoiceCommand(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    return this.request('/voice/process', {
      method: 'POST',
      body: formData
    });
  }

  // Multimodal Analysis
  async analyzeMultimodal(data) {
    return this.request('/multimodal/analyze', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

// Create singleton instance
const apiService = new ApiService();

// Mock API responses for development
if (process.env.NODE_ENV === 'development') {
  // Mock implementation for development
  apiService.analyzeSymptoms = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          analysis: {
            possibleConditions: [
              { name: 'Migraine', confidence: 85 },
              { name: 'Tension Headache', confidence: 70 },
              { name: 'Sinusitis', confidence: 60 }
            ],
            recommendations: [
              'Rest in a quiet, dark room',
              'Stay hydrated',
              'Consider over-the-counter pain relief',
              'Monitor symptoms for 24-48 hours'
            ],
            severity: 'Moderate',
            emergency: false
          }
        });
      }, 1500);
    });
  };

  apiService.findDoctors = async (criteria) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          doctors: [
            {
              id: 1,
              name: 'Dr. Alemayehu Tadesse',
              specialty: 'Cardiologist',
              hospital: 'St. Paul\'s Hospital',
              location: 'Addis Ababa',
              rating: 4.8,
              availability: 'Available Now'
            },
            // ... more mock doctors
          ]
        });
      }, 1000);
    });
  };
}

export default apiService;