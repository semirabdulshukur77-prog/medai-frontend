// src/services/localStorageService.js
class LocalStorageService {
  constructor() {
    this.prefix = 'medai_';
    this.encryptionEnabled = false;
    this.initEncryption();
  }

  initEncryption() {
    // Check if encryption is available (using Web Crypto API)
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      this.encryptionEnabled = true;
    }
  }

  // Basic CRUD operations
  set(key, value) {
    const storageKey = this.prefix + key;
    
    try {
      const stringValue = JSON.stringify(value);
      
      if (this.encryptionEnabled && this.shouldEncrypt(key)) {
        // Encrypt sensitive data
        const encrypted = this.encrypt(stringValue);
        localStorage.setItem(storageKey, encrypted);
      } else {
        localStorage.setItem(storageKey, stringValue);
      }
      
      return true;
    } catch (error) {
      console.error(`Failed to set localStorage item ${key}:`, error);
      return false;
    }
  }

  get(key, defaultValue = null) {
    const storageKey = this.prefix + key;
    
    try {
      let value = localStorage.getItem(storageKey);
      
      if (value === null) {
        return defaultValue;
      }
      
      if (this.encryptionEnabled && this.shouldEncrypt(key)) {
        // Decrypt sensitive data
        value = this.decrypt(value);
      }
      
      return JSON.parse(value);
    } catch (error) {
      console.error(`Failed to get localStorage item ${key}:`, error);
      return defaultValue;
    }
  }

  remove(key) {
    const storageKey = this.prefix + key;
    
    try {
      localStorage.removeItem(storageKey);
      return true;
    } catch (error) {
      console.error(`Failed to remove localStorage item ${key}:`, error);
      return false;
    }
  }

  clear() {
    try {
      // Only clear MedAI items
      const keysToRemove = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
      return false;
    }
  }

  // Medical data specific methods
  saveConsultation(consultationData) {
    const consultations = this.get('consultations', []);
    consultations.push({
      ...consultationData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    });
    
    this.set('consultations', consultations);
    return consultationData;
  }

  getConsultations(limit = 10) {
    const consultations = this.get('consultations', []);
    return consultations
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  savePrescription(prescriptionData) {
    const prescriptions = this.get('prescriptions', []);
    prescriptions.push({
      ...prescriptionData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    });
    
    this.set('prescriptions', prescriptions);
    return prescriptionData;
  }

  getPrescriptions() {
    return this.get('prescriptions', []);
  }

  saveAppointment(appointmentData) {
    const appointments = this.get('appointments', []);
    appointments.push({
      ...appointmentData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    });
    
    this.set('appointments', appointments);
    return appointmentData;
  }

  getAppointments() {
    return this.get('appointments', []);
  }

  getUpcomingAppointments() {
    const appointments = this.get('appointments', []);
    const now = new Date();
    
    return appointments
      .filter(apt => new Date(apt.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  saveMedicalHistory(historyData) {
    const history = this.get('medical_history', []);
    history.push({
      ...historyData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    });
    
    this.set('medical_history', history);
    return historyData;
  }

  getMedicalHistory() {
    return this.get('medical_history', []);
  }

  // User preferences
  saveUserPreferences(preferences) {
    return this.set('user_preferences', preferences);
  }

  getUserPreferences() {
    return this.get('user_preferences', {
      language: 'en',
      theme: 'light',
      notifications: true,
      fontSize: 'medium',
      autoSave: true
    });
  }

  // Voice settings
  saveVoiceSettings(settings) {
    return this.set('voice_settings', settings);
  }

  getVoiceSettings() {
    return this.get('voice_settings', {
      enabled: true,
      language: 'en-US',
      speed: 1.0,
      volume: 1.0
    });
  }

  // Analytics data
  saveAnalyticsEvent(event) {
    const events = this.get('analytics_events', []);
    events.push({
      ...event,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 1000 events
    if (events.length > 1000) {
      events.shift();
    }
    
    this.set('analytics_events', events);
  }

  getAnalyticsEvents(limit = 100) {
    const events = this.get('analytics_events', []);
    return events.slice(-limit);
  }

  // Emergency contacts
  saveEmergencyContacts(contacts) {
    return this.set('emergency_contacts', contacts);
  }

  getEmergencyContacts() {
    return this.get('emergency_contacts', [
      { name: 'Police', number: '911' },
      { name: 'Ambulance', number: '907' },
      { name: 'Fire', number: '939' }
    ]);
  }

  // Cache management
  setCache(key, value, ttl = 3600000) { // 1 hour default
    const cacheData = {
      value,
      expires: Date.now() + ttl
    };
    
    return this.set(`cache_${key}`, cacheData);
  }

  getCache(key) {
    const cacheData = this.get(`cache_${key}`);
    
    if (!cacheData || cacheData.expires < Date.now()) {
      this.remove(`cache_${key}`);
      return null;
    }
    
    return cacheData.value;
  }

  clearExpiredCache() {
    const keysToRemove = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(`${this.prefix}cache_`)) {
        const cacheData = this.get(key.replace(this.prefix, ''));
        if (cacheData && cacheData.expires < Date.now()) {
          keysToRemove.push(key);
        }
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }

  // Encryption methods (simplified for demo)
  shouldEncrypt(key) {
    const sensitiveKeys = [
      'user',
      'medical_history',
      'prescriptions',
      'consultations'
    ];
    
    return sensitiveKeys.some(sensitiveKey => key.includes(sensitiveKey));
  }

  encrypt(text) {
    // In production, use proper encryption like crypto.subtle
    // This is a simple obfuscation for demo purposes
    return btoa(unescape(encodeURIComponent(text)));
  }

  decrypt(encryptedText) {
    try {
      return decodeURIComponent(escape(atob(encryptedText)));
    } catch (error) {
      console.error('Decryption failed:', error);
      return encryptedText;
    }
  }

  // Storage usage
  getStorageUsage() {
    let totalBytes = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(this.prefix)) {
        const value = localStorage.getItem(key);
        totalBytes += key.length + value.length;
      }
    }
    
    return {
      bytes: totalBytes,
      kilobytes: (totalBytes / 1024).toFixed(2),
      megabytes: (totalBytes / (1024 * 1024)).toFixed(4)
    };
  }

  // Export/Import
  exportData() {
    const data = {};
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(this.prefix)) {
        const cleanKey = key.replace(this.prefix, '');
        data[cleanKey] = this.get(cleanKey);
      }
    }
    
    return JSON.stringify(data, null, 2);
  }

  importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      
      Object.entries(data).forEach(([key, value]) => {
        this.set(key, value);
      });
      
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }

  // Backup management
  createBackup() {
    const backup = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: this.exportData()
    };
    
    this.set('backup_' + Date.now(), backup);
    return backup;
  }

  getBackups() {
    const backups = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(`${this.prefix}backup_`)) {
        const backup = this.get(key.replace(this.prefix, ''));
        if (backup) {
          backups.push(backup);
        }
      }
    }
    
    return backups.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  restoreBackup(timestamp) {
    const backupKey = `backup_${timestamp}`;
    const backup = this.get(backupKey);
    
    if (backup && backup.data) {
      return this.importData(backup.data);
    }
    
    return false;
  }
}

// Create singleton instance
const localStorageService = new LocalStorageService();

// Clean expired cache on startup
localStorageService.clearExpiredCache();

export default localStorageService;