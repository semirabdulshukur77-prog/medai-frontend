// src/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Check for saved authentication on mount
    const savedUser = localStorage.getItem('medai_user');
    const savedRole = localStorage.getItem('medai_role');
    
    if (savedUser && savedRole) {
      setUser(JSON.parse(savedUser));
      setRole(savedRole);
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        let userData = null;
        let userRole = null;
        
        // Mock login logic
        if (credentials.email === 'patient@medai.com') {
          userData = {
            id: 'pat_001',
            name: 'Patient User',
            email: 'patient@medai.com',
            phone: '+251912345678',
            location: 'Addis Ababa',
            age: 32,
            gender: 'Male'
          };
          userRole = 'patient';
        } else if (credentials.email === 'doctor@medai.com') {
          userData = {
            id: 'doc_001',
            name: 'Dr. Alemayehu Tadesse',
            email: 'doctor@medai.com',
            specialty: 'Cardiologist',
            hospital: 'St. Paul\'s Hospital',
            experience: '15 years'
          };
          userRole = 'doctor';
        } else if (credentials.email === 'admin@medai.com') {
          userData = {
            id: 'admin_001',
            name: 'System Admin',
            email: 'admin@medai.com',
            permissions: ['all']
          };
          userRole = 'admin';
        }
        
        if (userData && userRole) {
          setUser(userData);
          setRole(userRole);
          localStorage.setItem('medai_user', JSON.stringify(userData));
          localStorage.setItem('medai_role', userRole);
          resolve({ success: true, user: userData, role: userRole });
        } else {
          resolve({ success: false, error: 'Invalid credentials' });
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('medai_user');
    localStorage.removeItem('medai_role');
  };

  const register = async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: `user_${Date.now()}`,
          ...userData,
          createdAt: new Date().toISOString()
        };
        
        setUser(newUser);
        setRole('patient');
        localStorage.setItem('medai_user', JSON.stringify(newUser));
        localStorage.setItem('medai_role', 'patient');
        
        resolve({ success: true, user: newUser });
      }, 1000);
    });
  };

  const updateProfile = async (updates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('medai_user', JSON.stringify(updatedUser));
        resolve({ success: true, user: updatedUser });
      }, 500);
    });
  };

  const value = {
    user,
    role,
    loading,
    login,
    logout,
    register,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};