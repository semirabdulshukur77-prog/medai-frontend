// src/utils/storage.js
import localStorageService from '../services/localStorageService';

class StorageManager {
  constructor() {
    this.isIndexedDBAvailable = 'indexedDB' in window;
    this.isWebSQLAvailable = 'openDatabase' in window;
    this.dbName = 'medai_database';
    this.dbVersion = 1;
    this.db = null;
    
    this.initIndexedDB();
  }

  async initIndexedDB() {
    if (!this.isIndexedDBAvailable) {
      console.warn('IndexedDB not available, using localStorage only');
      return;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        console.log('IndexedDB initialized successfully');
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object stores
        if (!db.objectStoreNames.contains('consultations')) {
          const consultationStore = db.createObjectStore('consultations', { 
            keyPath: 'id',
            autoIncrement: true 
          });
          consultationStore.createIndex('timestamp', 'timestamp', { unique: false });
          consultationStore.createIndex('user', 'userId', { unique: false });
        }

        if (!db.objectStoreNames.contains('prescriptions')) {
          const prescriptionStore = db.createObjectStore('prescriptions', { 
            keyPath: 'id',
            autoIncrement: true 
          });
          prescriptionStore.createIndex('timestamp', 'timestamp', { unique: false });
          prescriptionStore.createIndex('user', 'userId', { unique: false });
        }

        if (!db.objectStoreNames.contains('appointments')) {
          const appointmentStore = db.createObjectStore('appointments', { 
            keyPath: 'id',
            autoIncrement: true 
          });
          appointmentStore.createIndex('date', 'date', { unique: false });
          appointmentStore.createIndex('user', 'userId', { unique: false });
        }

        if (!db.objectStoreNames.contains('medical_history')) {
          const historyStore = db.createObjectStore('medical_history', { 
            keyPath: 'id',
            autoIncrement: true 
          });
          historyStore.createIndex('timestamp', 'timestamp', { unique: false });
          historyStore.createIndex('user', 'userId', { unique: false });
        }

        if (!db.objectStoreNames.contains('analytics')) {
          const analyticsStore = db.createObjectStore('analytics', { 
            keyPath: 'id',
            autoIncrement: true 
          });
          analyticsStore.createIndex('timestamp', 'timestamp', { unique: false });
          analyticsStore.createIndex('event', 'event', { unique: false });
        }
      };
    });
  }

  // Generic storage methods
  async save(storeName, data) {
    if (this.db) {
      return this.saveToIndexedDB(storeName, data);
    } else if (this.isWebSQLAvailable) {
      return this.saveToWebSQL(storeName, data);
    } else {
      return this.saveToLocalStorage(storeName, data);
    }
  }

  async get(storeName, id) {
    if (this.db) {
      return this.getFromIndexedDB(storeName, id);
    } else if (this.isWebSQLAvailable) {
      return this.getFromWebSQL(storeName, id);
    } else {
      return this.getFromLocalStorage(storeName, id);
    }
  }

  async getAll(storeName, query = {}) {
    if (this.db) {
      return this.getAllFromIndexedDB(storeName, query);
    } else if (this.isWebSQLAvailable) {
      return this.getAllFromWebSQL(storeName, query);
    } else {
      return this.getAllFromLocalStorage(storeName, query);
    }
  }

  async delete(storeName, id) {
    if (this.db) {
      return this.deleteFromIndexedDB(storeName, id);
    } else if (this.isWebSQLAvailable) {
      return this.deleteFromWebSQL(storeName, id);
    } else {
      return this.deleteFromLocalStorage(storeName, id);
    }
  }

  // IndexedDB methods
  async saveToIndexedDB(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      
      const request = store.put(data);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  }

  async getFromIndexedDB(storeName, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      
      const request = store.get(id);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  }

  async getAllFromIndexedDB(storeName, query = {}) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const results = [];
      
      let request;
      
      if (query.index && query.value) {
        const index = store.index(query.index);
        const keyRange = IDBKeyRange.only(query.value);
        request = index.openCursor(keyRange);
      } else {
        request = store.openCursor();
      }
      
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      
      request.onerror = (event) => reject(event.target.error);
    });
  }

  async deleteFromIndexedDB(storeName, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      
      const request = store.delete(id);
      
      request.onsuccess = () => resolve(true);
      request.onerror = (event) => reject(event.target.error);
    });
  }

  // WebSQL methods (fallback)
  saveToWebSQL(storeName, data) {
    return new Promise((resolve, reject) => {
      // WebSQL implementation
      resolve(data);
    });
  }

  getFromWebSQL(storeName, id) {
    return new Promise((resolve, reject) => {
      // WebSQL implementation
      resolve(null);
    });
  }

  // LocalStorage methods (fallback)
  saveToLocalStorage(storeName, data) {
    const key = `medai_${storeName}_${data.id || Date.now()}`;
    localStorageService.set(key, data);
    return Promise.resolve(data);
  }

  getFromLocalStorage(storeName, id) {
    const key = `medai_${storeName}_${id}`;
    return Promise.resolve(localStorageService.get(key));
  }

  getAllFromLocalStorage(storeName, query = {}) {
    const items = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(`medai_${storeName}_`)) {
        const item = localStorageService.get(key.replace('medai_', ''));
        if (item) {
          // Apply query filters
          let matches = true;
          
          if (query.where) {
            Object.entries(query.where).forEach(([field, value]) => {
              if (item[field] !== value) {
                matches = false;
              }
            });
          }
          
          if (matches) {
            items.push(item);
          }
        }
      }
    }
    
    // Apply sorting
    if (query.orderBy) {
      items.sort((a, b) => {
        const field = query.orderBy;
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
      });
    }
    
    // Apply limit
    if (query.limit) {
      return Promise.resolve(items.slice(0, query.limit));
    }
    
    return Promise.resolve(items);
  }

  deleteFromLocalStorage(storeName, id) {
    const key = `medai_${storeName}_${id}`;
    localStorageService.remove(key);
    return Promise.resolve(true);
  }

  // Specialized medical data methods
  async saveConsultation(consultation) {
    const data = {
      ...consultation,
      id: consultation.id || Date.now(),
      timestamp: consultation.timestamp || new Date().toISOString(),
      userId: consultation.userId || 'anonymous'
    };
    
    return this.save('consultations', data);
  }

  async getConsultations(userId, limit = 10) {
    return this.getAll('consultations', {
      where: { userId },
      orderBy: 'timestamp',
      limit
    });
  }

  async savePrescription(prescription) {
    const data = {
      ...prescription,
      id: prescription.id || Date.now(),
      timestamp: prescription.timestamp || new Date().toISOString(),
      userId: prescription.userId || 'anonymous'
    };
    
    return this.save('prescriptions', data);
  }

  async getPrescriptions(userId) {
    return this.getAll('prescriptions', {
      where: { userId },
      orderBy: 'timestamp'
    });
  }

  async saveAppointment(appointment) {
    const data = {
      ...appointment,
      id: appointment.id || Date.now(),
      timestamp: appointment.timestamp || new Date().toISOString(),
      userId: appointment.userId || 'anonymous'
    };
    
    return this.save('appointments', data);
  }

  async getAppointments(userId) {
    return this.getAll('appointments', {
      where: { userId },
      orderBy: 'date'
    });
  }

  async saveMedicalRecord(record) {
    const data = {
      ...record,
      id: record.id || Date.now(),
      timestamp: record.timestamp || new Date().toISOString(),
      userId: record.userId || 'anonymous'
    };
    
    return this.save('medical_history', data);
  }

  async getMedicalRecords(userId) {
    return this.getAll('medical_history', {
      where: { userId },
      orderBy: 'timestamp'
    });
  }

  // Analytics
  async logEvent(event, data = {}) {
    const eventData = {
      event,
      data,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    return this.save('analytics', eventData);
  }

  async getEvents(eventType, limit = 100) {
    return this.getAll('analytics', {
      where: { event: eventType },
      orderBy: 'timestamp',
      limit
    });
  }

  // Data export/import
  async exportData() {
    const data = {};
    const stores = ['consultations', 'prescriptions', 'appointments', 'medical_history', 'analytics'];
    
    for (const store of stores) {
      data[store] = await this.getAll(store);
    }
    
    return {
      version: '1.0',
      timestamp: new Date().toISOString(),
      data
    };
  }

  async importData(exportData) {
    if (exportData.version !== '1.0') {
      throw new Error('Unsupported export version');
    }
    
    for (const [storeName, items] of Object.entries(exportData.data)) {
      for (const item of items) {
        await this.save(storeName, item);
      }
    }
    
    return true;
  }

  // Cleanup old data
  async cleanupOldData(days = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const stores = ['analytics'];
    
    for (const storeName of stores) {
      const items = await this.getAll(storeName);
      
      for (const item of items) {
        if (new Date(item.timestamp) < cutoffDate) {
          await this.delete(storeName, item.id);
        }
      }
    }
    
    return true;
  }

  // Storage statistics
  async getStorageStats() {
    const stats = {
      indexedDB: this.db ? 'available' : 'unavailable',
      webSQL: this.isWebSQLAvailable ? 'available' : 'unavailable',
      localStorage: 'available',
      counts: {}
    };
    
    const stores = ['consultations', 'prescriptions', 'appointments', 'medical_history', 'analytics'];
    
    for (const storeName of stores) {
      const items = await this.getAll(storeName);
      stats.counts[storeName] = items.length;
    }
    
    return stats;
  }
}

// Create singleton instance
const storageManager = new StorageManager();

export default storageManager;