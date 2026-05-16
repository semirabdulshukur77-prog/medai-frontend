// src/components/MedAI.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useAgent } from '../AgentContext';
import { useVoice } from '../VoiceContext';
import { useNotification } from '../NotificationContext';
import { 
  FaHeartbeat, FaBrain, FaRobot, FaUserMd, FaMicrophone,
  FaSearch, FaSearchPlus, FaLocationCrosshairs, FaMagic,
  FaLanguage, FaGlobeAfrica, FaExclamationTriangle, FaExclamationCircle,
  FaCommentMedical, FaUser, FaHistory, FaStethoscope, FaStarOfLife,
  FaMapMarkerAlt, FaDownload, FaShareAlt, FaPrint, FaChevronDown,
  FaChevronLeft, FaChevronRight, FaShieldAlt, FaHandshake, FaCalendarCheck,
  FaEnvelope, FaPhone, FaFacebookF, FaTwitter, FaTelegram, FaYoutube,
  FaStopCircle, FaCheckCircle, FaCookieBite, FaAmbulance, FaPhoneAlt,
  FaTimes, FaSpinner, FaSignInAlt, FaUserPlus, FaChartLine,
  FaUserFriends, FaClock, FaStar, FaHospital, FaPrescriptionBottle,
  FaVideo, FaImage, FaPills, FaMap, FaLightbulb, FaBroadcastTower
} from 'react-icons/fa';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import './MedAI.css';

const MedAI = () => {
  const navigate = useNavigate();
  const { user, login, register, isAuthenticated, logout } = useAuth();
  const { agents, queryAgent, getAgentStats } = useAgent();
  const { 
    isListening, transcript, startListening, stopListening, 
    changeLanguage, speak, isSupported, error: voiceError,
    clearTranscript
  } = useVoice();
  const { notifySystem, addNotification } = useNotification();
  
  // Language state
  const [language, setLanguage] = useState('en');
  
  // Authentication modals
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '', email: '', password: '', confirmPassword: '', phone: ''
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Consultation States
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  // Doctor Finder States
  const [matchSymptoms, setMatchSymptoms] = useState('');
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [isFindingDoctors, setIsFindingDoctors] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [insuranceFilter, setInsuranceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;
  
  // Voice Modal States
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState(null);
  const [voiceInput, setVoiceInput] = useState('');
  
  // API Status States
  const [apiStatus, setApiStatus] = useState({
    aiService: true,
    doctorDatabase: true,
    voiceService: false,
    locationService: true
  });
  
  // Cookies Consent
  const [showCookiesConsent, setShowCookiesConsent] = useState(true);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  
  // Errors and Validation
  const [errors, setErrors] = useState({
    symptoms: '',
    matchSymptoms: ''
  });
  
  // Stats
  const [stats, setStats] = useState({
    consultations: 12543,
    doctors: 547,
    successRate: 99.8,
    responseTime: '2.4'
  });
  
  // Refs
  const symptomsTextareaRef = useRef(null);
  const matchSymptomsTextareaRef = useRef(null);
  const historyTextareaRef = useRef(null);
  
  // ===== MOCK DATA =====
  const mockDoctors = [
    {
      id: 1,
      name: 'Dr. Alemayehu Tadesse',
      specialty: 'Cardiologist',
      qualification: 'MD, Cardiology',
      hospital: 'St. Paul\'s Hospital',
      location: 'Addis Ababa, Bole',
      experience: '15 years',
      rating: 4.8,
      reviews: 234,
      availability: 'Available Now',
      insurance: ['Ethiopian Insurance', 'Private Insurance'],
      languages: ['Amharic', 'English', 'Oromo'],
      consultationFee: '500 ETB',
      image: 'https://via.placeholder.com/80',
      distance: '2.5 km'
    },
    {
      id: 2,
      name: 'Dr. Sophia Mekonnen',
      specialty: 'Neurologist',
      qualification: 'PhD, Neurology',
      hospital: 'Black Lion Hospital',
      location: 'Addis Ababa, Arada',
      experience: '12 years',
      rating: 4.9,
      reviews: 189,
      availability: 'This Week',
      insurance: ['Ethiopian Insurance'],
      languages: ['Amharic', 'English'],
      consultationFee: '600 ETB',
      image: 'https://via.placeholder.com/80',
      distance: '4.2 km'
    },
    {
      id: 3,
      name: 'Dr. Yohannes Assefa',
      specialty: 'Pediatrician',
      qualification: 'MD, Pediatrics',
      hospital: 'Tikur Anbessa Hospital',
      location: 'Addis Ababa, Kirkos',
      experience: '8 years',
      rating: 4.7,
      reviews: 156,
      availability: 'Available Now',
      insurance: ['Private Insurance'],
      languages: ['Amharic', 'English', 'Tigrinya'],
      consultationFee: '400 ETB',
      image: 'https://via.placeholder.com/80',
      distance: '3.1 km'
    },
    {
      id: 4,
      name: 'Dr. Helen Girma',
      specialty: 'Orthopedic Surgeon',
      qualification: 'MD, Orthopedics',
      hospital: 'Myungsung Christian Hospital',
      location: 'Addis Ababa, Bole',
      experience: '18 years',
      rating: 4.9,
      reviews: 278,
      availability: 'This Week',
      insurance: ['Ethiopian Insurance', 'Private Insurance'],
      languages: ['Amharic', 'English', 'Korean'],
      consultationFee: '800 ETB',
      image: 'https://via.placeholder.com/80',
      distance: '5.7 km'
    },
    {
      id: 5,
      name: 'Dr. Michael Tekle',
      specialty: 'General Physician',
      qualification: 'MD, General Medicine',
      hospital: 'Zewditu Memorial Hospital',
      location: 'Addis Ababa, Arada',
      experience: '10 years',
      rating: 4.6,
      reviews: 142,
      availability: 'Available Now',
      insurance: ['Ethiopian Insurance'],
      languages: ['Amharic', 'English'],
      consultationFee: '350 ETB',
      image: 'https://via.placeholder.com/80',
      distance: '1.8 km'
    },
    {
      id: 6,
      name: 'Dr. Selamawit Bekele',
      specialty: 'Dermatologist',
      qualification: 'MD, Dermatology',
      hospital: 'Yekatit 12 Hospital',
      location: 'Addis Ababa, Piazza',
      experience: '7 years',
      rating: 4.5,
      reviews: 98,
      availability: 'Available Now',
      insurance: ['Private Insurance'],
      languages: ['Amharic', 'English'],
      consultationFee: '450 ETB',
      image: 'https://via.placeholder.com/80',
      distance: '6.3 km'
    }
  ];

  const mockAnalysis = {
    possibleConditions: [
      { name: 'Migraine', confidence: 85 },
      { name: 'Tension Headache', confidence: 70 },
      { name: 'Vertigo', confidence: 60 },
      { name: 'Sinusitis', confidence: 45 }
    ],
    severity: 'Moderate',
    recommendations: [
      'Rest in a quiet, dark room',
      'Stay hydrated (drink at least 2 liters of water daily)',
      'Avoid caffeine and alcohol',
      'Consider over-the-counter pain relief if needed (ibuprofen or acetaminophen)',
      'Apply cold compress to forehead',
      'Practice relaxation techniques like deep breathing'
    ],
    whenToSeekHelp: 'If symptoms worsen or persist beyond 72 hours, or if you experience vision changes, severe vomiting, or neck stiffness.',
    suggestedSpecialists: ['Neurologist', 'General Physician', 'ENT Specialist'],
    emergencyWarning: false,
    selfCareTips: [
      'Maintain regular sleep schedule',
      'Reduce screen time',
      'Practice stress management',
      'Keep a symptom diary'
    ],
    timestamp: new Date().toISOString()
  };

  // ===== USE EFFECTS =====
  useEffect(() => {
    // Initialize language from localStorage
    const savedLanguage = localStorage.getItem('medai_language') || 'en';
    setLanguage(savedLanguage);
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir = savedLanguage === 'am' ? 'rtl' : 'ltr';
    
    // Initialize voice service
    if (isSupported) {
      changeLanguage(savedLanguage === 'am' ? 'am-ET' : 'en-US');
      setApiStatus(prev => ({ ...prev, voiceService: true }));
    }
    
    // Check geolocation support
    if ('geolocation' in navigator) {
      setApiStatus(prev => ({ ...prev, locationService: true }));
    }
    
    // Load cookies preference
    const cookiesPreference = localStorage.getItem('medai_cookies');
    if (cookiesPreference) {
      setCookiesAccepted(cookiesPreference === 'accepted');
      setShowCookiesConsent(false);
    }
    
    // Load user session if exists
    const savedUser = localStorage.getItem('medai_user');
    if (savedUser) {
      try {
        // User is already loaded via AuthContext
      } catch (error) {
        console.error('Error loading user session:', error);
      }
    }
    
    // Show welcome message
    setTimeout(() => {
      showToast(
        getText(
          'Welcome to MedAI! How can we help you today?',
          'ወደ ሜድኤይ እንኳን በደህና መጡ! ዛሬ እንዴት ልንረዳዎት እንችላለን?'
        ),
        'info'
      );
    }, 1000);
    
    // Setup voice event listener
    const handleVoiceResult = (data) => {
      if (data.final) {
        setVoiceInput(data.final);
      }
    };
    
    // Cleanup
    return () => {
      if (isListening) {
        stopListening();
      }
    };
  }, [isSupported, changeLanguage, isListening, stopListening]);

  // Update body direction when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'am' ? 'rtl' : 'ltr';
  }, [language]);

  // Filter doctors when filters change
  useEffect(() => {
    let filtered = [...doctors];
    
    if (availabilityFilter !== 'all') {
      filtered = filtered.filter(doctor => 
        doctor.availability.toLowerCase().includes(availabilityFilter)
      );
    }
    
    if (insuranceFilter !== 'all') {
      filtered = filtered.filter(doctor => 
        doctor.insurance.some(ins => 
          ins.toLowerCase().includes(insuranceFilter)
        )
      );
    }
    
    setFilteredDoctors(filtered);
    setCurrentPage(1);
  }, [doctors, availabilityFilter, insuranceFilter]);

  // ===== UTILITY FUNCTIONS =====
  const getText = (enText, amText) => {
    return language === 'en' ? enText : amText;
  };

  const showToast = (message, type = 'info') => {
    const backgroundColor = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    }[type];

    Toastify({
      text: message,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      backgroundColor,
      stopOnFocus: true,
    }).showToast();
  };

  // ===== LANGUAGE HANDLING =====
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('medai_language', lang);
    
    if (isSupported) {
      changeLanguage(lang === 'am' ? 'am-ET' : 'en-US');
    }
    
    showToast(
      lang === 'en'
        ? 'Language changed to English'
        : 'ቋንቋ ወደ አማርኛ ተቀይሯል',
      'success'
    );
  };

  // ===== AUTHENTICATION =====
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      const result = await login(loginData);
      if (result.success) {
        showToast(
          getText('Login successful!', 'መግባት ተሳክቷል!'),
          'success'
        );
        setShowLoginModal(false);
        setLoginData({ email: '', password: '' });
        notifySystem({
          title: getText('Welcome back!', 'እንኳን ደህና መጡ!'),
          message: getText('You are now logged in.', 'አሁን ገብተዋል።')
        });
      } else {
        showToast(result.error, 'error');
      }
    } catch (error) {
      showToast(getText('Login failed', 'መግባት አልተሳካም'), 'error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      showToast(
        getText('Passwords do not match', 'የይለፍ ቃላት አይዛመዱም'),
        'error'
      );
      return;
    }
    
    setIsRegistering(true);
    
    try {
      const result = await register({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        phone: registerData.phone
      });
      
      if (result.success) {
        showToast(
          getText('Registration successful!', 'ምዝገባ ተሳክቷል!'),
          'success'
        );
        setShowRegisterModal(false);
        setRegisterData({
          name: '', email: '', password: '', confirmPassword: '', phone: ''
        });
        notifySystem({
          title: getText('Welcome to MedAI!', 'ወደ ሜድኤይ እንኳን ደህና መጡ!'),
          message: getText('Your account has been created.', 'መለያዎ ተፈጥሯል።')
        });
      }
    } catch (error) {
      showToast(getText('Registration failed', 'ምዝገባ አልተሳካም'), 'error');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleLogout = () => {
    logout();
    showToast(
      getText('Logged out successfully', 'በተሳካ ሁኔታ ወጥተዋል'),
      'success'
    );
  };

  // ===== VOICE RECOGNITION =====
  const startVoiceRecording = (field) => {
    if (!isSupported) {
      showToast(
        getText(
          'Voice recognition is not supported in your browser',
          'ድምፅ አወቃቀር በአሳሽዎ አይደገፍም'
        ),
        'error'
      );
      return;
    }
    
    setActiveVoiceField(field);
    setIsVoiceModalOpen(true);
    clearTranscript();
    setVoiceInput('');
    startListening();
  };

  const stopVoiceRecording = () => {
    stopListening();
  };

  const applyVoiceInput = () => {
    if (!voiceInput.trim()) {
      showToast(
        getText(
          'No voice input detected',
          'ድምፅ አሰራር አልተገኘም'
        ),
        'warning'
      );
      return;
    }
    
    switch (activeVoiceField) {
      case 'symptoms':
        setSymptoms(voiceInput);
        break;
      case 'medicalHistory':
        setMedicalHistory(voiceInput);
        break;
      case 'matchSymptoms':
        setMatchSymptoms(voiceInput);
        break;
    }
    
    setIsVoiceModalOpen(false);
    setVoiceInput('');
    clearTranscript();
    
    showToast(
      getText(
        'Voice input applied successfully',
        'ድምፅ አሰራር በተሳካ ሁኔታ ተግብሯል'
      ),
      'success'
    );
  };

  // ===== CONSULTATION FUNCTIONS =====
  const validateSymptoms = () => {
    if (!symptoms.trim()) {
      setErrors(prev => ({ ...prev, symptoms: getText(
        'Please describe your symptoms',
        'እባክዎ ምልክቶችዎን ይግለጹ'
      )}));
      return false;
    }
    if (symptoms.trim().length < 10) {
      setErrors(prev => ({ ...prev, symptoms: getText(
        'Please provide more details about your symptoms',
        'እባክዎ ስለ ምልክቶችዎ ተጨማሪ ዝርዝሮችን ይስጡ'
      )}));
      return false;
    }
    setErrors(prev => ({ ...prev, symptoms: '' }));
    return true;
  };

  const handleAnalyzeSymptoms = async () => {
    if (!validateSymptoms()) {
      symptomsTextareaRef.current?.focus();
      return;
    }
    
    setIsAnalyzing(true);
    
    // Track analytics
    addNotification({
      type: 'consultation_start',
      title: getText('Analysis Started', 'ትንተና ተጀመረ'),
      message: getText('AI is analyzing your symptoms...', 'ኤአይ ምልክቶችዎን እየተንተነ ነው...'),
      priority: 'info'
    });
    
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
      
      showToast(
        getText(
          'Analysis completed successfully',
          'ትንተና በተሳካ ሁኔታ ተጠናቋል'
        ),
        'success'
      );
      
      addNotification({
        type: 'consultation_complete',
        title: getText('Analysis Complete', 'ትንተና ተጠናቋል'),
        message: getText('Your medical analysis is ready.', 'የጤና ትንተናዎ ዝግጁ ነው።'),
        priority: 'success'
      });
    }, 2000);
  };

  // ===== DOCTOR FINDER FUNCTIONS =====
  const validateMatchSymptoms = () => {
    if (!matchSymptoms.trim()) {
      setErrors(prev => ({ ...prev, matchSymptoms: getText(
        'Please describe symptoms for matching',
        'ለማጣጣል ምልክቶችን ይግለጹ'
      )}));
      return false;
    }
    setErrors(prev => ({ ...prev, matchSymptoms: '' }));
    return true;
  };

  const handleFindDoctors = async () => {
    if (!validateMatchSymptoms()) {
      matchSymptomsTextareaRef.current?.focus();
      return;
    }
    
    setIsFindingDoctors(true);
    
    // Auto-detect specialty if not selected
    let detectedSpecialty = specialty;
    if (!detectedSpecialty) {
      detectedSpecialty = autoDetectSpecialtyFromSymptoms(matchSymptoms);
      if (detectedSpecialty) {
        setSpecialty(detectedSpecialty);
      }
    }
    
    // Simulate API call
    setTimeout(() => {
      let matchedDoctors = [...mockDoctors];
      
      // Filter by specialty if selected
      if (detectedSpecialty) {
        matchedDoctors = matchedDoctors.filter(doctor => 
          doctor.specialty.toLowerCase().includes(detectedSpecialty.toLowerCase())
        );
      }
      
      // Filter by location if provided
      if (location.trim()) {
        matchedDoctors = matchedDoctors.filter(doctor =>
          doctor.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      setDoctors(matchedDoctors);
      setFilteredDoctors(matchedDoctors);
      setIsFindingDoctors(false);
      
      showToast(
        getText(
          `Found ${matchedDoctors.length} matching doctors`,
          `${matchedDoctors.length} የሚስማሙ ዶክተሮች ተገኝተዋል`
        ),
        'success'
      );
    }, 1500);
  };

  const autoDetectSpecialtyFromSymptoms = (symptomsText) => {
    const symptomsLower = symptomsText.toLowerCase();
    
    if (symptomsLower.includes('heart') || symptomsLower.includes('chest') || symptomsLower.includes('blood pressure')) {
      return 'cardiologist';
    } else if (symptomsLower.includes('head') || symptomsLower.includes('nerve') || symptomsLower.includes('brain')) {
      return 'neurologist';
    } else if (symptomsLower.includes('child') || symptomsLower.includes('baby') || symptomsLower.includes('pediatric')) {
      return 'pediatrician';
    } else if (symptomsLower.includes('bone') || symptomsLower.includes('joint') || symptomsLower.includes('fracture')) {
      return 'orthopedic';
    } else if (symptomsLower.includes('skin') || symptomsLower.includes('rash') || symptomsLower.includes('acne')) {
      return 'dermatologist';
    } else if (symptomsLower.includes('stomach') || symptomsLower.includes('digest') || symptomsLower.includes('bowel')) {
      return 'gastroenterologist';
    } else if (symptomsLower.includes('hormone') || symptomsLower.includes('diabetes') || symptomsLower.includes('thyroid')) {
      return 'endocrinologist';
    }
    
    return '';
  };

  const handleAutoDetectSpecialty = () => {
    if (!matchSymptoms.trim()) {
      showToast(
        getText(
          'Please enter symptoms first',
          'እባክዎ መጀመሪያ ምልክቶችን ያስገቡ'
        ),
        'warning'
      );
      return;
    }
    
    const detected = autoDetectSpecialtyFromSymptoms(matchSymptoms);
    
    if (detected) {
      setSpecialty(detected);
      
      const specialtyNames = {
        'cardiologist': getText('Cardiologist', 'ልብ ሐኪም'),
        'neurologist': getText('Neurologist', 'ነርቭ ሐኪም'),
        'pediatrician': getText('Pediatrician', 'የሕፃናት ሐኪም'),
        'orthopedic': getText('Orthopedic Surgeon', 'የአጥንት ሐኪም'),
        'general': getText('General Physician', 'አጠቃላይ ሐኪም'),
        'dermatologist': getText('Dermatologist', 'ቆዳ ሐኪም'),
        'gastroenterologist': getText('Gastroenterologist', 'የሆድ ሐኪም'),
        'endocrinologist': getText('Endocrinologist', 'የሆርሞን ሐኪም')
      };
      
      showToast(
        getText(
          `Detected specialty: ${specialtyNames[detected] || detected}`,
          `የተገኘ ሙያ: ${specialtyNames[detected] || detected}`
        ),
        'info'
      );
    } else {
      showToast(
        getText(
          'Could not detect specialty. Please select manually.',
          'ሙያ ማወቅ አልተቻለም። እባክዎ በእጅ ይምረጡ።'
        ),
        'warning'
      );
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      showToast(
        getText(
          'Geolocation is not supported by your browser',
          'ጂኦሎኬሽን በአሳሽዎ አይደገፍም'
        ),
        'error'
      );
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation('Addis Ababa');
        showToast(
          getText(
            'Location detected: Addis Ababa',
            'ቦታ ተገኝቷል: አዲስ አበባ'
          ),
          'success'
        );
      },
      (error) => {
        console.error('Geolocation error:', error);
        showToast(
          getText(
            'Unable to get your location. Please enter manually.',
            'ቦታዎን ማግኘት አልተቻለም። እባክዎ በእጅ ያስገቡ።'
          ),
          'error'
        );
      }
    );
  };

  // ===== ANALYSIS RESULTS FUNCTIONS =====
  const handleSaveAnalysis = () => {
    if (!analysisResult) return;
    
    // Save to localStorage
    const savedAnalyses = JSON.parse(localStorage.getItem('medai_analyses') || '[]');
    savedAnalyses.push({
      ...analysisResult,
      id: Date.now(),
      symptoms,
      timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('medai_analyses', JSON.stringify(savedAnalyses));
    
    showToast(
      getText(
        'Analysis saved successfully',
        'ትንተና በተሳካ ሁኔታ ተቀምጧል'
      ),
      'success'
    );
  };

  const handleShareAnalysis = () => {
    if (!analysisResult) return;
    
    if (navigator.share) {
      navigator.share({
        title: 'MedAI Medical Analysis',
        text: `MedAI Analysis Results:\nSymptoms: ${symptoms}\nPossible Conditions: ${analysisResult.possibleConditions.map(c => c.name).join(', ')}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(
        getText(
          'Link copied to clipboard',
          'አገናኝ ወደ ክሊፕቦርድ ተገልብጧል'
        ),
        'info'
      );
    }
  };

  const handlePrintAnalysis = () => {
    window.print();
  };

  // ===== COOKIES CONSENT =====
  const handleCookiesAccept = () => {
    setCookiesAccepted(true);
    setShowCookiesConsent(false);
    localStorage.setItem('medai_cookies', 'accepted');
    
    showToast(
      getText(
        'Cookies preferences saved',
        'የኩኪዎች ምርጫዎች ተቀምጠዋል'
      ),
      'success'
    );
  };

  const handleCookiesReject = () => {
    setCookiesAccepted(false);
    setShowCookiesConsent(false);
    localStorage.setItem('medai_cookies', 'rejected');
    
    showToast(
      getText(
        'Non-essential cookies rejected',
        'አስፈላጊ ያልሆኑ ኩኪዎች ተቀብለዋል'
      ),
      'info'
    );
  };

  // ===== EMERGENCY =====
  const handleEmergencyCall = () => {
    if (window.confirm(getText(
      'Call emergency hotline? This will dial 911.',
      'አደጋ ሆቴላይን ይደውሉ? ይህ 911 ይደውላል።'
    ))) {
      window.location.href = 'tel:911';
    }
  };

  // ===== PAGINATION =====
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ===== RENDER FUNCTIONS =====
  const renderDoctorCard = (doctor) => (
    <div key={doctor.id} className="doctor-card">
      <div className="doctor-card-header">
        <img src={doctor.image} alt={doctor.name} className="doctor-image" />
        <div className="doctor-info">
          <h4 className="doctor-name">{doctor.name}</h4>
          <p className="doctor-specialty">{doctor.specialty}</p>
          <p className="doctor-qualification">{doctor.qualification}</p>
        </div>
        <div className="doctor-rating">
          <span className="rating-star">⭐</span>
          <span className="rating-value">{doctor.rating}</span>
          <span className="rating-reviews">({doctor.reviews} {getText('reviews', 'ግምገማዎች')})</span>
        </div>
      </div>
      
      <div className="doctor-details">
        <div className="detail-item">
          <FaHospital className="detail-icon" />
          <span>{doctor.hospital}</span>
        </div>
        <div className="detail-item">
          <FaMapMarkerAlt className="detail-icon" />
          <span>{doctor.location} • {doctor.distance}</span>
        </div>
        <div className="detail-item">
          <FaUserMd className="detail-icon" />
          <span>{doctor.experience} {getText('experience', 'ልምድ')}</span>
        </div>
        <div className="detail-item">
          <FaCalendarCheck className="detail-icon" />
          <span className={`availability ${doctor.availability === 'Available Now' ? 'available' : ''}`}>
            {doctor.availability}
          </span>
        </div>
        <div className="detail-item">
          <FaShieldAlt className="detail-icon" />
          <span>{doctor.insurance.join(', ')}</span>
        </div>
        <div className="detail-item">
          <FaLanguage className="detail-icon" />
          <span>{doctor.languages.join(', ')}</span>
        </div>
      </div>
      
      <div className="doctor-footer">
        <div className="consultation-fee">
          <span className="fee-label">{getText('Consultation:', 'የምክክር ክፍያ:')}</span>
          <span className="fee-amount">{doctor.consultationFee}</span>
        </div>
        <div className="doctor-actions">
          <button className="btn btn-outline btn-sm">
            <FaPhone /> {getText('Call', 'ደውል')}
          </button>
          <button className="btn btn-primary btn-sm">
            <FaCalendarCheck /> {getText('Book', 'ቀጠሮ ያዙ')}
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnalysisResult = () => {
    if (!analysisResult) return null;
    
    return (
      <div className="analysis-result">
        <div className="result-section">
          <h4>{getText('Possible Conditions', 'ሊሆኑ የሚችሉ ሁኔታዎች')}</h4>
          <div className="conditions-list">
            {analysisResult.possibleConditions.map((condition, index) => (
              <div key={index} className="condition-item">
                <span className="condition-name">{condition.name}</span>
                <div className="confidence-meter">
                  <div 
                    className="confidence-fill"
                    style={{ width: `${condition.confidence}%` }}
                    data-confidence={condition.confidence}
                  ></div>
                </div>
                <span className="confidence-value">{condition.confidence}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="result-section">
          <h4>{getText('Recommendations', 'ጠቆማዎች')}</h4>
          <ul className="recommendations-list">
            {analysisResult.recommendations.map((rec, index) => (
              <li key={index}>
                <FaCheckCircle className="recommendation-icon" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="result-section">
          <h4>{getText('Self-Care Tips', 'የራስ እንክብካቤ ምክሮች')}</h4>
          <div className="tips-grid">
            {analysisResult.selfCareTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <FaLightbulb className="tip-icon" />
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="result-section warning">
          <FaExclamationTriangle className="warning-icon" />
          <div className="warning-content">
            <strong>{getText('When to seek medical help:', 'መቼ ማደርያ እንደሚገባ:')}</strong>
            <p>{analysisResult.whenToSeekHelp}</p>
          </div>
        </div>
        
        <div className="result-section">
          <h4>{getText('Suggested Specialists', 'የተመከሩ ባለሙያዎች')}</h4>
          <div className="specialists-tags">
            {analysisResult.suggestedSpecialists.map((spec, index) => (
              <span key={index} className="specialist-tag">
                <FaUserMd /> {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <div className="user-menu">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name || 'User'}</span>
              <span className="user-role">{user?.role || 'Patient'}</span>
            </div>
          </div>
          <div className="user-actions">
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => navigate('/dashboard')}
            >
              <FaChartLine /> {getText('Dashboard', 'ዳሽቦርድ')}
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={handleLogout}
            >
              {getText('Logout', 'ውጣ')}
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="auth-buttons">
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => setShowLoginModal(true)}
        >
          <FaSignInAlt /> {getText('Login', 'ግባ')}
        </button>
        <button 
          className="btn btn-outline btn-sm"
          onClick={() => setShowRegisterModal(true)}
        >
          <FaUserPlus /> {getText('Register', 'ተመዝገብ')}
        </button>
      </div>
    );
  };

  const renderLoginModal = () => (
    <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{getText('Login to MedAI', 'ወደ ሜድኤይ ይግቡ')}</h3>
          <button 
            className="close-modal"
            onClick={() => setShowLoginModal(false)}
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">
              {getText('Email', 'ኢሜይል')}
            </label>
            <input
              type="email"
              className="form-input"
              value={loginData.email}
              onChange={(e) => setLoginData(prev => ({...prev, email: e.target.value}))}
              placeholder="user@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              {getText('Password', 'የይለፍ ቃል')}
            </label>
            <input
              type="password"
              className="form-input"
              value={loginData.password}
              onChange={(e) => setLoginData(prev => ({...prev, password: e.target.value}))}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <FaSpinner className="loading-spinner" />
                <span>{getText('Logging in...', 'በመግባት ላይ...')}</span>
              </>
            ) : (
              <span>{getText('Login', 'ግባ')}</span>
            )}
          </button>
        </form>
        
        <div className="modal-footer">
          <p className="text-center">
            {getText("Don't have an account?", 'መለያ የሎትም?')}{' '}
            <button 
              className="btn btn-text"
              onClick={() => {
                setShowLoginModal(false);
                setShowRegisterModal(true);
              }}
            >
              {getText('Register here', 'እዚህ ይመዝገቡ')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderRegisterModal = () => (
    <div className="modal-overlay" onClick={() => setShowRegisterModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{getText('Create Account', 'መለያ ይፍጠሩ')}</h3>
          <button 
            className="close-modal"
            onClick={() => setShowRegisterModal(false)}
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">
              {getText('Full Name', 'ሙሉ ስም')}
            </label>
            <input
              type="text"
              className="form-input"
              value={registerData.name}
              onChange={(e) => setRegisterData(prev => ({...prev, name: e.target.value}))}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              {getText('Email', 'ኢሜይል')}
            </label>
            <input
              type="email"
              className="form-input"
              value={registerData.email}
              onChange={(e) => setRegisterData(prev => ({...prev, email: e.target.value}))}
              placeholder="user@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              {getText('Phone Number', 'ስልክ ቁጥር')}
            </label>
            <input
              type="tel"
              className="form-input"
              value={registerData.phone}
              onChange={(e) => setRegisterData(prev => ({...prev, phone: e.target.value}))}
              placeholder="+251 91 234 5678"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              {getText('Password', 'የይለፍ ቃል')}
            </label>
            <input
              type="password"
              className="form-input"
              value={registerData.password}
              onChange={(e) => setRegisterData(prev => ({...prev, password: e.target.value}))}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              {getText('Confirm Password', 'የይለፍ ቃል አረጋግጥ')}
            </label>
            <input
              type="password"
              className="form-input"
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData(prev => ({...prev, confirmPassword: e.target.value}))}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={isRegistering}
          >
            {isRegistering ? (
              <>
                <FaSpinner className="loading-spinner" />
                <span>{getText('Registering...', 'በምዝገባ ላይ...')}</span>
              </>
            ) : (
              <span>{getText('Register', 'ተመዝገብ')}</span>
            )}
          </button>
        </form>
        
        <div className="modal-footer">
          <p className="text-center">
            {getText('Already have an account?', 'አስቀድመው መለያ አለዎት?')}{' '}
            <button 
              className="btn btn-text"
              onClick={() => {
                setShowRegisterModal(false);
                setShowLoginModal(true);
              }}
            >
              {getText('Login here', 'እዚህ ይግቡ')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderVoiceModal = () => (
    <div className="modal-overlay" onClick={() => setIsVoiceModalOpen(false)}>
      <div className="modal-content voice-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{getText('Voice Input', 'ድምፅ አሰራር')}</h3>
          <button 
            className="close-modal"
            onClick={() => setIsVoiceModalOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="voice-animation">
            <div className={`voice-circle ${isListening ? 'listening' : ''}`}>
              <FaMicrophone />
            </div>
            <div className="voice-waves">
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
            </div>
          </div>
          
          <p className="voice-instruction">
            {isListening 
              ? getText('Speak now...', 'አሁን ተናገሩ...')
              : getText('Ready to listen', 'ለማዳመጥ ዝግጁ')}
          </p>
          
          <div className="voice-text-preview">
            {transcript || voiceInput || getText('Speech will appear here...', 'ድምፅ እዚህ ይታያል...')}
          </div>
          
          {voiceError && (
            <div className="voice-error">
              <FaExclamationCircle />
              <span>{voiceError}</span>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <div className="voice-actions">
            <button 
              className={`voice-action-btn ${isListening ? 'stop' : 'start'}`}
              onClick={isListening ? stopVoiceRecording : () => startListening()}
            >
              {isListening ? (
                <>
                  <FaStopCircle />
                  <span>{getText('Stop', 'አቁም')}</span>
                </>
              ) : (
                <>
                  <FaMicrophone />
                  <span>{getText('Start', 'ጀምር')}</span>
                </>
              )}
            </button>
            
            <button 
              className="voice-action-btn submit"
              onClick={applyVoiceInput}
              disabled={!voiceInput.trim() && !transcript}
            >
              <FaCheckCircle />
              <span>{getText('Apply', 'ተግብር')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCookiesConsent = () => (
    <div className="cookies-consent">
      <div className="cookies-content">
        <FaCookieBite className="cookies-icon" />
        <div className="cookies-text">
          <p>
            {getText(
              'We use cookies to enhance your experience and ensure security. By continuing, you agree to our use of cookies.',
              'ልምድዎን ለማሻሻል እና ደህንነት ለማረጋገጥ ኩኪዎችን እንጠቀማለን። በመቀጠል፣ ኩኪዎችን መጠቀማችንን ተቀበሉ።'
            )}
          </p>
        </div>
        <div className="cookies-actions">
          <button 
            className="cookies-reject"
            onClick={handleCookiesReject}
          >
            {getText('Reject Non-Essential', 'አስፈላጊ ያልሆኑትን አትቀበል')}
          </button>
          <button 
            className="cookies-accept"
            onClick={handleCookiesAccept}
          >
            {getText('Accept All', 'ሁሉንም ተቀበል')}
          </button>
        </div>
      </div>
    </div>
  );

  // ===== MAIN RENDER =====
  return (
    <div className="medai-app">
      {/* Skip to main content */}
      <a href="#main-content" className="skip-to-main">
        {getText('Skip to main content', 'ወደ ዋና ይዘት ብለህ ሂድ')}
      </a>

      {/* Language Selector & Header */}
      <div className="language-selector">
        <div className="language-switch">
          <button 
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('en')}
            aria-label="Switch to English"
          >
            <FaLanguage />
            <span>ENGLISH</span>
          </button>
          <button 
            className={`lang-btn ${language === 'am' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('am')}
            aria-label="ወደ አማርኛ ቀይር"
          >
            <FaGlobeAfrica />
            <span>አማርኛ</span>
          </button>
        </div>
        
        <div className="header-right">
          {renderAuthButtons()}
          
          <div className="api-status">
            <div className="api-dropdown">
              <span className="api-indicator active">
                {getText('API Connected', 'ኤፒአይ ተገናኝቷል')}
              </span>
              <FaChevronDown />
              <div className="api-dropdown-menu">
                <div className="api-service">
                  <span className={`status-dot ${apiStatus.aiService ? 'active' : 'warning'}`}></span>
                  <span>{getText('AI Service', 'የኤአይ አገልግሎት')}: </span>
                  <span>{apiStatus.aiService ? getText('Connected', 'ተገናኝቷል') : getText('Loading', 'በመጫን ላይ')}</span>
                </div>
                <div className="api-service">
                  <span className={`status-dot ${apiStatus.doctorDatabase ? 'active' : 'warning'}`}></span>
                  <span>{getText('Doctor Database', 'የዶክተር ዳታቤዝ')}: </span>
                  <span>{apiStatus.doctorDatabase ? getText('Connected', 'ተገናኝቷል') : getText('Loading', 'በመጫን ላይ')}</span>
                </div>
                <div className="api-service">
                  <span className={`status-dot ${apiStatus.voiceService ? 'active' : 'warning'}`}></span>
                  <span>{getText('Voice Service', 'የድምፅ አገልግሎት')}: </span>
                  <span>{apiStatus.voiceService ? getText('Connected', 'ተገናኝቷል') : getText('Loading', 'በመጫን ላይ')}</span>
                </div>
                <div className="api-service">
                  <span className={`status-dot ${apiStatus.locationService ? 'active' : 'warning'}`}></span>
                  <span>{getText('Location Service', 'የቦታ አገልግሎት')}: </span>
                  <span>{apiStatus.locationService ? getText('Ready', 'ዝግጁ') : getText('Loading', 'በመጫን ላይ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container" id="main-content">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <FaHeartbeat className="logo-icon" />
            <div className="logo-text">
              <h1>MedAI</h1>
              <span className="logo-subtitle">{getText('Intelligent Healthcare', 'የውስጠ-ማህበረሰብ ጤና')}</span>
            </div>
          </div>
          
          <div className="header-stats">
            <div className="stat-item">
              <FaUserFriends className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">{stats.consultations.toLocaleString()}+</span>
                <span className="stat-label">{getText('Consultations', 'ምክሮች')}</span>
              </div>
            </div>
            <div className="stat-item">
              <FaUserMd className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">{stats.doctors}+</span>
                <span className="stat-label">{getText('Doctors', 'ዶክተሮች')}</span>
              </div>
            </div>
            <div className="stat-item">
              <FaStar className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">{stats.successRate}%</span>
                <span className="stat-label">{getText('Success Rate', 'የስኬት መጠን')}</span>
              </div>
            </div>
            <div className="stat-item">
              <FaClock className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">{stats.responseTime}s</span>
                <span className="stat-label">{getText('Avg Response', 'አማካይ ምላሽ')}</span>
              </div>
            </div>
          </div>
          
          <div className="emergency-notice">
            <FaExclamationTriangle />
            <span>
              {getText(
                'For emergencies, call 911 or visit the nearest hospital immediately.',
                'ለአደጋ ሁኔታዎች፣ 911 ይደውሉ ወይም ወዲያውኑ ወደ ቅርብ ሆስፒታል ይሂዱ።'
              )}
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {/* Left Column - Consultation */}
          <section className="column consultation-column">
            <div className="card">
              <div className="card-header">
                <h2>{getText('AI Medical Consultation', 'የኤአይ የጤና ምክር')}</h2>
                <div className="ai-badge">
                  <FaBrain />
                  <span>{getText('AI Powered', 'በኤአይ የሚሰራ')}</span>
                </div>
              </div>

              {/* Symptoms Input */}
              <div className="input-section">
                <label className="input-label">
                  <FaCommentMedical />
                  <span>{getText('Describe Your Symptoms', 'ምልክቶችዎን ግለጽ')}</span>
                  <span className="required-asterisk">*</span>
                </label>
                <div className="input-with-voice">
                  <textarea
                    ref={symptomsTextareaRef}
                    id="symptomsInput"
                    className="symptoms-textarea"
                    placeholder={getText(
                      'e.g., I\'ve had a persistent headache and dizziness for 3 days...',
                      'ለምሳሌ፣ ለ3 ቀናት የማይቋረጥ ራስ ምታት እና ማዞር ነበረኝ...'
                    )}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={4}
                  />
                  <button 
                    className="voice-btn"
                    onClick={() => startVoiceRecording('symptoms')}
                    aria-label={getText('Voice input for symptoms', 'ለምልክቶች ድምፅ አሰራር')}
                    type="button"
                  >
                    <FaMicrophone />
                    {isListening && activeVoiceField === 'symptoms' && (
                      <span className="pulse"></span>
                    )}
                  </button>
                </div>
                <p className="input-hint">
                  {getText(
                    'Describe in detail: when it started, severity, triggers, etc.',
                    'በዝርዝር ግለጹ፡ መቼ እንደተጀመረ፣ ከፍተኛነቱ፣ ምክንያቶቹ፣ ወዘተ'
                  )}
                </p>
                {errors.symptoms && (
                  <div className="error-message" role="alert">
                    <FaExclamationCircle />
                    <span>{errors.symptoms}</span>
                  </div>
                )}
              </div>

              {/* Age Input */}
              <div className="input-section">
                <label className="input-label">
                  <FaUser />
                  <span>{getText('Age (Optional)', 'እድሜ (አማራጭ)')}</span>
                </label>
                <input
                  type="number"
                  id="ageInput"
                  min="1"
                  max="120"
                  placeholder={getText('Enter your age', 'እድሜዎን ያስገቡ')}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <p className="input-hint">
                  {getText('Age helps in accurate diagnosis', 'እድሜ ትክክለኛ ህክምና ለመስጠት ይረዳል')}
                </p>
              </div>

              {/* Medical History */}
              <div className="input-section">
                <label className="input-label">
                  <FaHistory />
                  <span>{getText('Medical History (Optional)', 'የጤና ታሪክ (አማራጭ)')}</span>
                </label>
                <div className="input-with-voice">
                  <textarea
                    ref={historyTextareaRef}
                    id="historyInput"
                    className="history-textarea"
                    placeholder={getText(
                      'Any pre-existing conditions, allergies, or previous treatments...',
                      'ያለፉ የጤና ችግሮች፣ አለርጂዎች፣ ወይም ቀደም ያሉ ህክምናዎች...'
                    )}
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                    rows={3}
                  />
                  <button 
                    className="voice-btn"
                    onClick={() => startVoiceRecording('medicalHistory')}
                    aria-label={getText('Voice input for medical history', 'ለጤና ታሪክ ድምፅ አሰራር')}
                    type="button"
                  >
                    <FaMicrophone />
                  </button>
                </div>
                <p className="input-hint">
                  {getText(
                    'Mention medications, chronic conditions, or surgeries',
                    'መድሃኒቶች፣ የረዥም ጊዜ ችግሮች፣ ወይም ቀዶ ህክምናዎችን ያስታውሱ'
                  )}
                </p>
              </div>

              {/* Analyze Button */}
              <button 
                className={`analyze-btn ${isAnalyzing ? 'loading' : ''}`}
                onClick={handleAnalyzeSymptoms}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <FaSpinner className="loading-spinner" />
                    <span>{getText('Analyzing...', 'በመተንተን ላይ...')}</span>
                  </>
                ) : (
                  <>
                    <FaSearch />
                    <span>{getText('Analyze Symptoms', 'ምልክቶችን ይተንትኑ')}</span>
                  </>
                )}
              </button>

              {/* Privacy Notice */}
              <div className="privacy-notice">
                <FaShieldAlt />
                <span>
                  {getText(
                    'Your information is encrypted and never stored. This is not a substitute for professional medical advice.',
                    'መረጃዎ ተመስገን እና በጭራሽ አይከማችም። ይህ ለሙያ የጤና ምክር ምትክ አይደለም።'
                  )}
                </span>
              </div>

              {/* AI Response */}
              <div className="ai-response">
                <div className="response-header">
                  <FaRobot />
                  <h3>{getText('AI Analysis', 'የኤአይ ትንተና')}</h3>
                </div>
                <div className="response-content">
                  {isAnalyzing ? (
                    <div className="loading-skeleton">
                      <div className="skeleton-line"></div>
                      <div className="skeleton-line"></div>
                      <div className="skeleton-line"></div>
                      <div className="skeleton-line" style={{ width: '70%' }}></div>
                    </div>
                  ) : analysisResult ? (
                    renderAnalysisResult()
                  ) : (
                    <div className="placeholder-state">
                      <FaBrain className="placeholder-icon" />
                      <p className="placeholder-text">
                        {getText('Your analysis will appear here...', 'ትንተናዎ እዚህ ይታያል...')}
                      </p>
                      <p className="placeholder-hint">
                        {getText('Enter symptoms above and click "Analyze Symptoms"', 'ምልክቶችን ከላይ ያስገቡ እና "ምልክቶችን ይተንትኑ" የሚለውን ጠቅ ያድርጉ')}
                      </p>
                    </div>
                  )}
                </div>
                {analysisResult && (
                  <div className="response-actions">
                    <button className="response-action-btn" onClick={handleSaveAnalysis}>
                      <FaDownload />
                      <span className="action-label">{getText('Save', 'አስቀምጥ')}</span>
                    </button>
                    <button className="response-action-btn" onClick={handleShareAnalysis}>
                      <FaShareAlt />
                      <span className="action-label">{getText('Share', 'አጋራ')}</span>
                    </button>
                    <button className="response-action-btn" onClick={handlePrintAnalysis}>
                      <FaPrint />
                      <span className="action-label">{getText('Print', 'አተም')}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right Column - Doctor Finder */}
          <section className="column doctor-column">
            <div className="card">
              <div className="card-header">
                <h2>{getText('Find the Right Doctor', 'ምቹ ዶክተር ያግኙ')}</h2>
                <div className="match-badge">
                  <FaUserMd />
                  <span>{getText('Smart Match', 'ማስተናገድ')}</span>
                </div>
              </div>

              {/* Symptoms for Matching */}
              <div className="input-section">
                <label className="input-label">
                  <FaStethoscope />
                  <span>{getText('Symptoms for Specialist Matching', 'ለልዩ ባለሙያ የሚዛመዱ ምልክቶች')}</span>
                  <span className="required-asterisk">*</span>
                </label>
                <div className="input-with-voice">
                  <textarea
                    ref={matchSymptomsTextareaRef}
                    id="matchSymptoms"
                    className="match-textarea"
                    placeholder={getText(
                      'Describe symptoms to find the right specialist...',
                      'ምቹ ባለሙያ ለማግኘት ምልክቶችዎን ግለጽ...'
                    )}
                    value={matchSymptoms}
                    onChange={(e) => setMatchSymptoms(e.target.value)}
                    rows={3}
                  />
                  <button 
                    className="voice-btn"
                    onClick={() => startVoiceRecording('matchSymptoms')}
                    aria-label={getText('Voice input for specialist matching', 'ለባለሙያ ማጣጣል ድምፅ አሰራር')}
                    type="button"
                  >
                    <FaMicrophone />
                  </button>
                </div>
                <p className="input-hint">
                  {getText('Be specific to get the best match', 'ምርጡን ማጣጣል ለማግኘት በዝርዝር ይግለጹ')}
                </p>
                {errors.matchSymptoms && (
                  <div className="error-message" role="alert">
                    <FaExclamationCircle />
                    <span>{errors.matchSymptoms}</span>
                  </div>
                )}
              </div>

              {/* Location Input */}
              <div className="input-section">
                <label className="input-label">
                  <FaMapMarkerAlt />
                  <span>{getText('Preferred Location (Optional)', 'ምርጫ ቦታ (አማራጭ)')}</span>
                </label>
                <div className="location-input">
                  <input
                    type="text"
                    id="locationInput"
                    placeholder={getText('e.g., Addis Ababa, Bole', 'ለምሳሌ፣ አዲስ አበባ፣ ቦሌ')}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <button 
                    className="location-btn"
                    onClick={handleGetCurrentLocation}
                    aria-label={getText('Use current location', 'የአሁኑን ቦታ ተጠቀም')}
                    type="button"
                  >
                    <FaLocationCrosshairs />
                  </button>
                </div>
                <p className="input-hint">
                  {getText('City, district, or landmark', 'ከተማ፣ አውራጃ፣ ወይም መለሰያ')}
                </p>
              </div>

              {/* Specialty Input */}
              <div className="input-section">
                <label className="input-label">
                  <FaStarOfLife />
                  <span>{getText('Preferred Specialty', 'ምርጫ ሙያ')}</span>
                </label>
                <div className="specialty-select">
                  <select 
                    id="specialtySelect"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                  >
                    <option value="">{getText('Auto-detect from symptoms', 'ከምልክቶች በራስ ማወቅ')}</option>
                    <option value="cardiologist">{getText('Cardiologist', 'ልብ ሐኪም')}</option>
                    <option value="neurologist">{getText('Neurologist', 'ነርቭ ሐኪም')}</option>
                    <option value="pediatrician">{getText('Pediatrician', 'የሕፃናት ሐኪም')}</option>
                    <option value="orthopedic">{getText('Orthopedic Surgeon', 'የአጥንት ሐኪም')}</option>
                    <option value="general">{getText('General Physician', 'አጠቃላይ ሐኪም')}</option>
                    <option value="dermatologist">{getText('Dermatologist', 'ቆዳ ሐኪም')}</option>
                    <option value="gastroenterologist">{getText('Gastroenterologist', 'የሆድ ሐኪም')}</option>
                    <option value="endocrinologist">{getText('Endocrinologist', 'የሆርሞን ሐኪም')}</option>
                  </select>
                  <button 
                    className="auto-detect"
                    onClick={handleAutoDetectSpecialty}
                    aria-label={getText('Auto-detect specialty from symptoms', 'ሙያ በራስ መርምር')}
                    type="button"
                  >
                    <FaMagic />
                    <span>{getText('Auto-detect', 'ራስ መርምር')}</span>
                  </button>
                </div>
                <p className="input-hint">
                  {getText(
                    'Select or let AI suggest the best specialty',
                    'ምረጥ ወይም ኤአይ ምርጡን ሙያ እንዲጠቁም ፍቀድ'
                  )}
                </p>
              </div>

              {/* Find Doctors Button */}
              <button 
                className={`find-doctors-btn ${isFindingDoctors ? 'loading' : ''}`}
                onClick={handleFindDoctors}
                disabled={isFindingDoctors}
              >
                {isFindingDoctors ? (
                  <>
                    <FaSpinner className="loading-spinner" />
                    <span>{getText('Finding Doctors...', 'ዶክተሮችን በመፈለግ ላይ...')}</span>
                  </>
                ) : (
                  <>
                    <FaSearchPlus />
                    <span>{getText('Find Doctors', 'ዶክተሮችን ያግኙ')}</span>
                  </>
                )}
              </button>

              {/* Filter Options */}
              {doctors.length > 0 && (
                <div className="filter-options">
                  <div className="filter-group">
                    <label className="filter-label">
                      {getText('Availability', 'መገኘት')}
                    </label>
                    <select 
                      value={availabilityFilter}
                      onChange={(e) => setAvailabilityFilter(e.target.value)}
                    >
                      <option value="all">{getText('All', 'ሁሉም')}</option>
                      <option value="available">{getText('Available Now', 'አሁን የሚገኙ')}</option>
                      <option value="week">{getText('This Week', 'ይህ ሳምንት')}</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label className="filter-label">
                      {getText('Insurance', 'ኢንሹራንስ')}
                    </label>
                    <select 
                      value={insuranceFilter}
                      onChange={(e) => setInsuranceFilter(e.target.value)}
                    >
                      <option value="all">{getText('All', 'ሁሉም')}</option>
                      <option value="ethiopian">{getText('Ethiopian Insurance', 'ኢትዮጵያ ኢንሹራንስ')}</option>
                      <option value="private">{getText('Private Insurance', 'ግል ኢንሹራንስ')}</option>
                      <option value="none">{getText('No Insurance', 'ኢንሹራንስ የለም')}</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Doctors Results */}
              <div className="doctors-results">
                <div className="results-header">
                  <h3>{getText('Recommended Doctors', 'የተመከሩ ዶክተሮች')}</h3>
                  <span className="results-count">
                    {filteredDoctors.length} {getText('doctors found', 'ዶክተሮች ተገኝተዋል')}
                  </span>
                </div>
                
                <div className="doctors-list">
                  {isFindingDoctors ? (
                    <div className="loading-skeleton">
                      <div className="doctor-skeleton"></div>
                      <div className="doctor-skeleton"></div>
                      <div className="doctor-skeleton"></div>
                    </div>
                  ) : currentDoctors.length > 0 ? (
                    currentDoctors.map(renderDoctorCard)
                  ) : doctors.length > 0 ? (
                    <div className="empty-state">
                      <FaUserMd className="empty-icon" />
                      <p>{getText('No doctors match your filters', 'ከአጣሪዎት ጋር የሚስማሙ ዶክተሮች አልተገኙም')}</p>
                      <button 
                        className="btn btn-text"
                        onClick={() => {
                          setAvailabilityFilter('all');
                          setInsuranceFilter('all');
                        }}
                      >
                        {getText('Clear filters', 'አጣሪዎችን አጽዳ')}
                      </button>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <FaUserMd className="empty-icon" />
                      <p>{getText('Your matched doctors will appear here', 'የተመከሩ ዶክተሮች እዚህ ይታያሉ')}</p>
                      <p className="empty-hint">
                        {getText('Enter symptoms and click "Find Doctors"', 'ምልክቶችን ያስገቡ እና "ዶክተሮችን ያግኙ" የሚለውን ጠቅ ያድርጉ')}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Pagination */}
                {filteredDoctors.length > doctorsPerPage && (
                  <div className="pagination">
                    <button 
                      className="pagination-btn prev"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      <FaChevronLeft />
                      <span>{getText('Previous', 'ቀዳሚ')}</span>
                    </button>
                    <span className="page-info">
                      {getText('Page', 'ገጽ')} {currentPage} {getText('of', 'ከ')} {totalPages}
                    </span>
                    <button 
                      className="pagination-btn next"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <span>{getText('Next', 'ቀጣይ')}</span>
                      <FaChevronRight />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* Features Section */}
        <section className="features-section">
          <div className="feature-card" onClick={() => navigate('/dashboard')}>
            <div className="feature-icon">
              <FaChartLine />
            </div>
            <h3>{getText('Dashboard', 'ዳሽቦርድ')}</h3>
            <p>
              {getText(
                'Track your health metrics and view medical history',
                'የጤና መለኪያዎችዎን ይከታተሉ እና የጤና ታሪክዎን ይመልከቱ'
              )}
            </p>
          </div>
          <div className="feature-card" onClick={() => navigate('/video-call')}>
            <div className="feature-icon">
              <FaVideo />
            </div>
            <h3>{getText('Video Consult', 'የቪዲዮ ምክር')}</h3>
            <p>
              {getText(
                'Connect with doctors via secure video calls',
                'በደህንነት የተጠበቀ የቪዲዮ ጥሪ በመጠቀም ከዶክተሮች ጋር ይገናኙ'
              )}
            </p>
          </div>
          <div className="feature-card" onClick={() => navigate('/drug-checker')}>
            <div className="feature-icon">
              <FaPills />
            </div>
            <h3>{getText('Drug Checker', 'የመድሃኒት አጣራ')}</h3>
            <p>
              {getText(
                'Check drug interactions and side effects',
                'የመድሃኒት ግንኙነቶችን እና የጎን ውጤቶችን ያረጋግጡ'
              )}
            </p>
          </div>
          <div className="feature-card" onClick={() => navigate('/radiology')}>
            <div className="feature-icon">
              <FaImage />
            </div>
            <h3>{getText('Radiology AI', 'የራዲዮሎጂ ኤአይ')}</h3>
            <p>
              {getText(
                'AI-powered analysis of medical images',
                'በኤአይ የሚሰራ የጤና ምስሎች ትንተና'
              )}
            </p>
          </div>
          <div className="feature-card" onClick={() => navigate('/ethiopia-map')}>
            <div className="feature-icon">
              <FaMap />
            </div>
            <h3>{getText('Health Map', 'የጤና ካርታ')}</h3>
            <p>
              {getText(
                'Find healthcare facilities across Ethiopia',
                'በኢትዮጵያ ውስጥ የጤና አገልግሎቶችን ያግኙ'
              )}
            </p>
          </div>
          <div className="feature-card" onClick={() => navigate('/voice-assistant')}>
            <div className="feature-icon">
              <FaMicrophone />
            </div>
            <h3>{getText('Voice Assistant', 'ድምፅ ረዳት')}</h3>
            <p>
              {getText(
                'Hands-free medical assistance via voice',
                'በድምፅ የሚሰራ የእጅ ነፃ የጤና እርዳታ'
              )}
            </p>
          </div>
        </section>
        
        {/* Statistics Banner */}
        <div className="stats-banner">
          <div className="stat-item">
            <span className="stat-number">10,000+</span>
            <span className="stat-label">
              {getText('Successful Consultations', 'የተሳኩ የጤና ምክሮች')}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">
              {getText('Verified Doctors', 'የተረጋገጡ ዶክተሮች')}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">
              {getText('AI Support', 'የኤአይ ድጋፍ')}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-number">99.8%</span>
            <span className="stat-label">
              {getText('User Satisfaction', 'የተጠቃሚ እርካታ')}
            </span>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>{getText('About MedAI', 'ስለ ሜድኤይ')}</h3>
              <p>
                {getText(
                  'Revolutionizing healthcare access in Ethiopia through AI-powered medical consultation and doctor matching.',
                  'በኤአይ የሚሰራ የጤና ምክር እና ዶክተር ማጣጣል በኢትዮጵያ የጤና አገልግሎት መዳረሻን በማደስ ላይ።'
                )}
              </p>
            </div>
            <div className="footer-section">
              <h3>{getText('Quick Links', 'ፈጣን አገናኞች')}</h3>
              <ul>
                <li><button className="btn btn-text" onClick={() => navigate('/dashboard')}>{getText('Dashboard', 'ዳሽቦርድ')}</button></li>
                <li><button className="btn btn-text" onClick={() => navigate('/doctor')}>{getText('For Doctors', 'ለዶክተሮች')}</button></li>
                <li><button className="btn btn-text" onClick={() => navigate('/admin')}>{getText('Admin Panel', 'አስተዳዳሪ ፓነል')}</button></li>
                <li><button className="btn btn-text" onClick={() => navigate('/history')}>{getText('Medical History', 'የጤና ታሪክ')}</button></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>{getText('Contact', 'አግኙን')}</h3>
              <ul className="contact-info">
                <li>
                  <FaEnvelope />
                  <span>support@medai-health.com</span>
                </li>
                <li>
                  <FaPhone />
                  <span>+251 911 234 567</span>
                </li>
                <li>
                  <FaMapMarkerAlt />
                  <span>{getText('Addis Ababa, Ethiopia', 'አዲስ አበባ፣ ኢትዮጵያ')}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © 2024 MedAI Health Systems. {getText('All rights reserved.', 'ሁሉም መብቶች የተጠበቁ ናቸው።')}
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Telegram">
                <FaTelegram />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Voice Recognition Modal */}
      {isVoiceModalOpen && renderVoiceModal()}

      {/* Login Modal */}
      {showLoginModal && renderLoginModal()}

      {/* Register Modal */}
      {showRegisterModal && renderRegisterModal()}

      {/* Cookies Consent */}
      {showCookiesConsent && renderCookiesConsent()}

      {/* Emergency Hotline Banner */}
      <div className="emergency-hotline">
        <FaAmbulance className="hotline-icon" />
        <div className="hotline-text">
          <strong>{getText('Emergency Hotline:', 'አደጋ ሆቴላይን:')}</strong>
          <span>911 | 907 | 952</span>
        </div>
        <button 
          className="hotline-call"
          onClick={handleEmergencyCall}
        >
          <FaPhoneAlt />
          <span>{getText('Call Now', 'አሁን ይደውሉ')}</span>
        </button>
      </div>
    </div>
  );
};

export default MedAI;