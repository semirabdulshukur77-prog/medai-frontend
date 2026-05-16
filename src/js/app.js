// src/js/app.js
import apiService from './api.js';
import voiceService from './voice.js';
import translationService from './translate.js';

class MedAIApp {
  constructor() {
    this.isInitialized = false;
    this.currentUser = null;
    this.socket = null;
    this.realtimeUpdates = [];
  }

  async init() {
    if (this.isInitialized) {
      console.warn('App already initialized');
      return;
    }

    console.log('Initializing MedAI Application...');

    try {
      // Load user session
      await this.loadUserSession();
      
      // Initialize services
      this.initServices();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Connect to realtime updates
      await this.connectRealtime();
      
      // Initialize UI components
      this.initUIComponents();
      
      this.isInitialized = true;
      console.log('MedAI Application initialized successfully');
      
      this.dispatchEvent('app:ready');
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.showCriticalError('Failed to initialize application. Please refresh.');
    }
  }

  async loadUserSession() {
    const userData = localStorage.getItem('medai_user');
    const token = localStorage.getItem('medai_token');
    
    if (userData && token) {
      try {
        this.currentUser = JSON.parse(userData);
        apiService.setToken(token);
        
        // Validate token with server
        await this.validateSession();
        
        this.dispatchEvent('user:loaded', this.currentUser);
      } catch (error) {
        console.warn('Invalid session, clearing:', error);
        this.clearSession();
      }
    }
  }

  async validateSession() {
    // In a real app, this would ping the server
    return Promise.resolve(true);
  }

  initServices() {
    // Initialize voice recognition if supported
    if (voiceService.isVoiceSupported()) {
      voiceService.initVoiceRecognition();
      
      // Setup voice event listeners
      voiceService.addVoiceEventListener('result', (data) => {
        this.handleVoiceResult(data);
      });
      
      voiceService.addVoiceEventListener('error', (error) => {
        this.handleVoiceError(error);
      });
    }
    
    // Set initial language
    const savedLang = localStorage.getItem('medai_language') || 'en';
    translationService.setLanguage(savedLang);
  }

  setupEventListeners() {
    // Language change
    window.addEventListener('languageChange', (event) => {
      this.handleLanguageChange(event.detail.language);
    });
    
    // Online/offline
    window.addEventListener('online', () => this.handleOnlineStatus(true));
    window.addEventListener('offline', () => this.handleOnlineStatus(false));
    
    // Before unload
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
    
    // Custom events
    document.addEventListener('medai:consultation:start', (event) => {
      this.trackEvent('consultation_start', event.detail);
    });
    
    document.addEventListener('medai:doctor:search', (event) => {
      this.trackEvent('doctor_search', event.detail);
    });
  }

  async connectRealtime() {
    // WebSocket connection for realtime updates
    if (window.WebSocket) {
      const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:5000/ws';
      
      try {
        this.socket = new WebSocket(wsUrl);
        
        this.socket.onopen = () => {
          console.log('WebSocket connected');
          this.dispatchEvent('realtime:connected');
        };
        
        this.socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          this.handleRealtimeMessage(data);
        };
        
        this.socket.onclose = () => {
          console.log('WebSocket disconnected');
          this.dispatchEvent('realtime:disconnected');
          
          // Attempt reconnect after 5 seconds
          setTimeout(() => this.connectRealtime(), 5000);
        };
        
        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
      } catch (error) {
        console.warn('WebSocket connection failed:', error);
      }
    }
  }

  handleRealtimeMessage(data) {
    switch (data.type) {
      case 'notification':
        this.handleNotification(data.payload);
        break;
      case 'appointment_update':
        this.handleAppointmentUpdate(data.payload);
        break;
      case 'emergency_alert':
        this.handleEmergencyAlert(data.payload);
        break;
      case 'system_status':
        this.handleSystemStatus(data.payload);
        break;
    }
    
    this.realtimeUpdates.push(data);
    this.dispatchEvent('realtime:message', data);
  }

  handleNotification(notification) {
    // Show notification to user
    this.showNotification(notification);
    
    // Update notification count
    this.updateNotificationCount();
  }

  handleAppointmentUpdate(update) {
    // Update appointment status
    this.dispatchEvent('appointment:updated', update);
  }

  handleEmergencyAlert(alert) {
    // Show emergency alert
    this.showEmergencyAlert(alert);
  }

  handleSystemStatus(status) {
    // Update system status indicators
    this.updateSystemStatus(status);
  }

  initUIComponents() {
    // Initialize tooltips
    this.initTooltips();
    
    // Initialize modals
    this.initModals();
    
    // Initialize form validation
    this.initFormValidation();
    
    // Initialize charts if needed
    if (typeof Chart !== 'undefined') {
      this.initCharts();
    }
  }

  initTooltips() {
    // Initialize Bootstrap tooltips if available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }

  initModals() {
    // Initialize modal functionality
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      modal.addEventListener('hidden.bs.modal', () => {
        // Cleanup modal on hide
      });
    });
  }

  initFormValidation() {
    // Add custom form validation
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        
        form.classList.add('was-validated');
      }, false);
    });
  }

  initCharts() {
    // Initialize chart.js charts
    const chartElements = document.querySelectorAll('[data-chart]');
    
    chartElements.forEach(element => {
      const chartType = element.getAttribute('data-chart-type') || 'line';
      const chartData = JSON.parse(element.getAttribute('data-chart-data') || '{}');
      
      new Chart(element, {
        type: chartType,
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    });
  }

  handleVoiceResult(data) {
    if (data.final) {
      // Process final transcript
      this.processVoiceCommand(data.final);
    }
    
    // Update UI with interim results
    this.updateVoiceUI(data.interim, data.final);
  }

  handleVoiceError(error) {
    console.error('Voice recognition error:', error);
    
    let message = 'Voice recognition error';
    if (error === 'no-speech') {
      message = 'No speech detected';
    } else if (error === 'audio-capture') {
      message = 'No microphone found';
    } else if (error === 'not-allowed') {
      message = 'Microphone access denied';
    }
    
    this.showToast(message, 'error');
  }

  processVoiceCommand(transcript) {
    console.log('Processing voice command:', transcript);
    
    // Try to match with registered commands
    const processed = voiceService.processVoiceCommand(transcript);
    
    if (!processed) {
      // Default behavior - fill active input field
      this.fillActiveInput(transcript);
    }
    
    this.dispatchEvent('voice:command', { transcript, processed });
  }

  fillActiveInput(text) {
    const activeElement = document.activeElement;
    
    if (activeElement && (
      activeElement.tagName === 'INPUT' || 
      activeElement.tagName === 'TEXTAREA'
    )) {
      activeElement.value = text;
      
      // Trigger change event
      const event = new Event('input', { bubbles: true });
      activeElement.dispatchEvent(event);
    }
  }

  updateVoiceUI(interim, final) {
    // Update voice modal or indicator
    const voiceIndicator = document.getElementById('voiceIndicator');
    if (voiceIndicator) {
      voiceIndicator.textContent = interim || final || 'Listening...';
    }
  }

  handleLanguageChange(language) {
    console.log('Language changed to:', language);
    
    // Update voice recognition language
    voiceService.setLanguage(language);
    
    // Save preference
    localStorage.setItem('medai_language', language);
    
    // Update UI direction
    document.documentElement.dir = language === 'am' ? 'rtl' : 'ltr';
    
    this.dispatchEvent('language:changed', { language });
  }

  handleOnlineStatus(isOnline) {
    const statusElement = document.getElementById('connectionStatus');
    if (statusElement) {
      statusElement.textContent = isOnline ? 'Online' : 'Offline';
      statusElement.className = `badge ${isOnline ? 'badge-success' : 'badge-warning'}`;
    }
    
    this.dispatchEvent('connection:changed', { isOnline });
  }

  async trackEvent(eventName, data = {}) {
    // Send analytics event
    const analyticsData = {
      event: eventName,
      timestamp: new Date().toISOString(),
      user: this.currentUser?.id || 'anonymous',
      ...data
    };
    
    try {
      // In production, send to analytics service
      if (process.env.NODE_ENV === 'production') {
        await apiService.request('/analytics/track', {
          method: 'POST',
          body: JSON.stringify(analyticsData)
        });
      }
      
      console.log('Event tracked:', analyticsData);
    } catch (error) {
      console.warn('Failed to track event:', error);
    }
  }

  showToast(message, type = 'info') {
    // Use Toastify or custom implementation
    if (typeof Toastify === 'function') {
      Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: this.getToastColor(type),
        stopOnFocus: true,
      }).showToast();
    } else {
      // Fallback alert
      alert(message);
    }
  }

  showNotification(notification) {
    // Show desktop notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
    
    // Show in-app notification
    this.dispatchEvent('notification:received', notification);
  }

  showEmergencyAlert(alert) {
    // Show emergency alert modal
    const modal = document.getElementById('emergencyModal');
    if (modal) {
      modal.querySelector('.modal-body').textContent = alert.message;
      new bootstrap.Modal(modal).show();
    } else {
      // Fallback to alert
      alert(`EMERGENCY: ${alert.message}`);
    }
    
    // Play alert sound
    this.playAlertSound();
  }

  playAlertSound() {
    const audio = new Audio('/sounds/alert.mp3');
    audio.play().catch(console.error);
  }

  updateSystemStatus(status) {
    // Update API status indicators
    const apiStatusElement = document.getElementById('apiStatus');
    if (apiStatusElement) {
      apiStatusElement.textContent = status.online ? 'Connected' : 'Disconnected';
      apiStatusElement.className = `badge ${status.online ? 'badge-success' : 'badge-danger'}`;
    }
  }

  updateNotificationCount() {
    // Update notification badge
    const badge = document.getElementById('notificationBadge');
    if (badge) {
      const count = parseInt(badge.textContent) || 0;
      badge.textContent = count + 1;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  getToastColor(type) {
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };
    return colors[type] || colors.info;
  }

  showCriticalError(message) {
    // Show critical error modal
    const errorModal = document.createElement('div');
    errorModal.className = 'modal-overlay';
    errorModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Critical Error</h5>
        </div>
        <div class="modal-body">
          <p>${message}</p>
        </div>
        <div class="modal-footer">
          <button onclick="location.reload()" class="btn btn-primary">
            Refresh Page
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(errorModal);
  }

  clearSession() {
    this.currentUser = null;
    localStorage.removeItem('medai_user');
    localStorage.removeItem('medai_token');
    apiService.setToken(null);
    
    this.dispatchEvent('user:loggedout');
  }

  cleanup() {
    // Close WebSocket
    if (this.socket) {
      this.socket.close();
    }
    
    // Stop voice recognition
    voiceService.stopListening();
    voiceService.stopSpeaking();
  }

  dispatchEvent(name, detail = {}) {
    const event = new CustomEvent(name, { detail });
    window.dispatchEvent(event);
  }
}

// Create singleton instance
const medAIApp = new MedAIApp();

// Initialize app on load
window.addEventListener('DOMContentLoaded', () => {
  medAIApp.init().catch(console.error);
});

// Export for use in other modules
export function initApp() {
  return medAIApp;
}

export default medAIApp;