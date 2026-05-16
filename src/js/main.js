// src/js/main.js
import apiService from './api.js';
import { initVoiceRecognition } from './voice.js';
import { initTranslation } from './translate.js';
import { initApp } from './app.js';

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check for necessary APIs
  if (!('localStorage' in window)) {
    console.error('LocalStorage is not available. Some features may not work.');
  }

  // Initialize voice recognition if supported
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    initVoiceRecognition();
  } else {
    console.warn('Web Speech API not supported. Voice features disabled.');
  }

  // Initialize translation system
  initTranslation();

  // Initialize main application
  initApp();
});

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  
  // Show user-friendly error message for critical errors
  if (event.error.message.includes('Critical')) {
    showErrorToast('An unexpected error occurred. Please refresh the page.');
  }
});

// Handle offline/online events
window.addEventListener('offline', () => {
  showWarningToast('You are offline. Some features may not work.');
});

window.addEventListener('online', () => {
  showSuccessToast('You are back online.');
});

// Utility functions for toast notifications
function showErrorToast(message) {
  showToast(message, 'error');
}

function showSuccessToast(message) {
  showToast(message, 'success');
}

function showWarningToast(message) {
  showToast(message, 'warning');
}

function showInfoToast(message) {
  showToast(message, 'info');
}

function showToast(message, type = 'info') {
  // Check if Toastify is available
  if (typeof Toastify === 'function') {
    Toastify({
      text: message,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      backgroundColor: getToastColor(type),
      stopOnFocus: true,
    }).showToast();
  } else {
    // Fallback to alert
    alert(message);
  }
}

function getToastColor(type) {
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };
  return colors[type] || colors.info;
}

// Export for use in other modules
export {
  apiService,
  showToast,
  showErrorToast,
  showSuccessToast,
  showWarningToast,
  showInfoToast
};