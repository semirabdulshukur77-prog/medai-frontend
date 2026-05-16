// index.jsx - MedAI Medical Consultation System React Component

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  FaHeartbeat, 
  FaBrain, 
  FaRobot, 
  FaUserMd, 
  FaMicrophone,
  FaSearch, 
  FaSearchPlus,
  FaLocationCrosshairs,
  FaMagic,
  FaLanguage,
  FaGlobeAfrica,
  FaExclamationTriangle,
  FaExclamationCircle,
  FaCommentMedical,
  FaUser,
  FaHistory,
  FaStethoscope,
  FaStarOfLife,
  FaMapMarkerAlt,
  FaDownload,
  FaShareAlt,
  FaPrint,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaShieldAlt,
  FaHandshake,
  FaCalendarCheck,
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaTelegram,
  FaYoutube,
  FaStopCircle,
  FaCheckCircle,
  FaCookieBite,
  FaAmbulance,
  FaPhoneAlt,
  FaTimes,
  FaSpinner
} from 'react-icons/fa';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import './index.css';

const MedAI = () => {
  // ===== STATE MANAGEMENT =====
  const [language, setLanguage] = useState('en');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState(null);
  
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
  const [doctorsPerPage] = useState(5);
  
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
  
  // Refs
  const recognitionRef = useRef(null);
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
      image: 'https://via.placeholder.com/80'
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
      image: 'https://via.placeholder.com/80'
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
      image: 'https://via.placeholder.com/80'
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
      image: 'https://via.placeholder.com/80'
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
      image: 'https://via.placeholder.com/80'
    }
  ];

  const mockAnalysis = {
    possibleConditions: [
      { name: 'Migraine', confidence: 85 },
      { name: 'Tension Headache', confidence: 70 },
      { name: 'Vertigo', confidence: 60 }
    ],
    severity: 'Moderate',
    recommendations: [
      'Rest in a quiet, dark room',
      'Stay hydrated',
      'Avoid caffeine and alcohol',
      'Consider over-the-counter pain relief if needed'
    ],
    whenToSeekHelp: 'If symptoms worsen or persist beyond 72 hours',
    suggestedSpecialists: ['Neurologist', 'General Physician'],
    emergencyWarning: false
  };

  // ===== USE EFFECTS =====
  useEffect(() => {
    // Initialize language from localStorage
    const savedLanguage = localStorage.getItem('medai_language') || 'en';
    setLanguage(savedLanguage);
    document.body.setAttribute('lang', savedLanguage);
    
    // Initialize voice recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setVoiceInput(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        showToast(
          language === 'en' 
            ? 'Voice recognition failed. Please try again.' 
            : 'ድምፅ አወቃቀር አልተሳካም። እባክዎ እንደገና ይሞክሩ።',
          'error'
        );
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
      
      setApiStatus(prev => ({ ...prev, voiceService: true }));
    }
    
    // Check for geolocation support
    if ('geolocation' in navigator) {
      setApiStatus(prev => ({ ...prev, locationService: true }));
    }
    
    // Load cookies preference
    const cookiesPreference = localStorage.getItem('medai_cookies');
    if (cookiesPreference) {
      setCookiesAccepted(cookiesPreference === 'accepted');
      setShowCookiesConsent(false);
    }
    
    // Show welcome message
    setTimeout(() => {
      showToast(
        language === 'en'
          ? 'Welcome to MedAI! How can we help you today?'
          : 'ወደ ሜድኤይ እንኳን በደህና መጡ! ዛሬ እንዴት ልንረዳዎት እንችላለን?',
        'info'
      );
    }, 1000);
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]);

  useEffect(() => {
    // Update body direction for RTL languages
    document.body.setAttribute('lang', language);
    document.body.style.direction = language === 'am' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    // Filter doctors based on selected filters
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

  // ===== LANGUAGE HANDLING =====
  const getText = (enText, amText) => {
    return language === 'en' ? enText : amText;
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('medai_language', lang);
    
    showToast(
      lang === 'en'
        ? 'Language changed to English'
        : 'ቋንቋ ወደ አማርኛ ተቀይሯል',
      'success'
    );
  };

  // ===== VOICE RECOGNITION =====
  const startVoiceRecording = (field) => {
    if (!recognitionRef.current) {
      showToast(
        language === 'en'
          ? 'Voice recognition is not supported in your browser'
          : 'ድምፅ አወቃቀር በአሳሽዎ አይደገፍም',
        'error'
      );
      return;
    }
    
    setActiveVoiceField(field);
    setIsVoiceModalOpen(true);
    setIsRecording(true);
    setVoiceInput('');
    
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      setIsRecording(false);
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const applyVoiceInput = () => {
    if (!voiceInput.trim()) {
      showToast(
        language === 'en'
          ? 'No voice input detected'
          : 'ድምፅ አሰራር አልተገኘም',
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
    
    showToast(
      language === 'en'
        ? 'Voice input applied successfully'
        : 'ድምፅ አሰራር በተሳካ ሁኔታ ተግብሯል',
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
    setErrors(prev => ({ ...prev, symptoms: '' }));
    return true;
  };

  const handleAnalyzeSymptoms = async () => {
    if (!validateSymptoms()) {
      symptomsTextareaRef.current?.focus();
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
      
      showToast(
        language === 'en'
          ? 'Analysis completed successfully'
          : 'ትንተና በተሳካ ሁኔታ ተጠናቋል',
        'success'
      );
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
      // Simple AI-like specialty detection based on symptoms
      const symptomsLower = matchSymptoms.toLowerCase();
      if (symptomsLower.includes('heart') || symptomsLower.includes('chest')) {
        detectedSpecialty = 'cardiologist';
      } else if (symptomsLower.includes('headache') || symptomsLower.includes('nerve')) {
        detectedSpecialty = 'neurologist';
      } else if (symptomsLower.includes('child') || symptomsLower.includes('baby')) {
        detectedSpecialty = 'pediatrician';
      }
      setSpecialty(detectedSpecialty);
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
        language === 'en'
          ? `Found ${matchedDoctors.length} matching doctors`
          : `${matchedDoctors.length} የሚስማሙ ዶክተሮች ተገኝተዋል`,
        'success'
      );
    }, 1500);
  };

  const handleAutoDetectSpecialty = () => {
    if (!matchSymptoms.trim()) {
      showToast(
        language === 'en'
          ? 'Please enter symptoms first'
          : 'እባክዎ መጀመሪያ ምልክቶችን ያስገቡ',
        'warning'
      );
      return;
    }
    
    // Simple AI detection
    const symptomsLower = matchSymptoms.toLowerCase();
    let detected = '';
    
    if (symptomsLower.includes('heart') || symptomsLower.includes('chest') || symptomsLower.includes('blood pressure')) {
      detected = 'cardiologist';
    } else if (symptomsLower.includes('head') || symptomsLower.includes('nerve') || symptomsLower.includes('brain')) {
      detected = 'neurologist';
    } else if (symptomsLower.includes('child') || symptomsLower.includes('baby') || symptomsLower.includes('pediatric')) {
      detected = 'pediatrician';
    } else if (symptomsLower.includes('bone') || symptomsLower.includes('joint') || symptomsLower.includes('fracture')) {
      detected = 'orthopedic';
    } else if (symptomsLower.includes('skin') || symptomsLower.includes('rash') || symptomsLower.includes('acne')) {
      detected = 'dermatologist';
    } else if (symptomsLower.includes('stomach') || symptomsLower.includes('digest') || symptomsLower.includes('bowel')) {
      detected = 'gastroenterologist';
    } else if (symptomsLower.includes('hormone') || symptomsLower.includes('diabetes') || symptomsLower.includes('thyroid')) {
      detected = 'endocrinologist';
    } else {
      detected = 'general';
    }
    
    setSpecialty(detected);
    
    showToast(
      language === 'en'
        ? `Detected specialty: ${detected}`
        : `የተገኘ ሙያ: ${getText(
            { 
              cardiologist: 'Cardiologist', 
              neurologist: 'Neurologist',
              pediatrician: 'Pediatrician',
              orthopedic: 'Orthopedic Surgeon',
              general: 'General Physician',
              dermatologist: 'Dermatologist',
              gastroenterologist: 'Gastroenterologist',
              endocrinologist: 'Endocrinologist'
            }[detected],
            {
              cardiologist: 'ልብ ሐኪም',
              neurologist: 'ነርቭ ሐኪም',
              pediatrician: 'የሕፃናት ሐኪም',
              orthopedic: 'የአጥንት ሐኪም',
              general: 'አጠቃላይ ሐኪም',
              dermatologist: 'ቆዳ ሐኪም',
              gastroenterologist: 'የሆድ ሐኪም',
              endocrinologist: 'የሆርሞን ሐኪም'
            }[detected]
          )}`,
      'info'
    );
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      showToast(
        language === 'en'
          ? 'Geolocation is not supported by your browser'
          : 'ጂኦሎኬሽን በአሳሽዎ አይደገፍም',
        'error'
      );
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you would reverse geocode the coordinates
        setLocation('Addis Ababa');
        showToast(
          language === 'en'
            ? 'Location detected: Addis Ababa'
            : 'ቦታ ተገኝቷል: አዲስ አበባ',
          'success'
        );
      },
      (error) => {
        console.error('Geolocation error:', error);
        showToast(
          language === 'en'
            ? 'Unable to get your location. Please enter manually.'
            : 'ቦታዎን ማግኘት አልተቻለም። እባክዎ በእጅ ያስገቡ።',
          'error'
        );
      }
    );
  };

  // ===== UTILITY FUNCTIONS =====
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

  const handleSaveAnalysis = () => {
    // In a real app, this would save to local storage or server
    showToast(
      language === 'en'
        ? 'Analysis saved successfully'
        : 'ትንተና በተሳካ ሁኔታ ተቀምጧል',
      'success'
    );
  };

  const handleShareAnalysis = () => {
    if (navigator.share) {
      navigator.share({
        title: 'MedAI Medical Analysis',
        text: 'Check out my medical analysis from MedAI',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(
        language === 'en'
          ? 'Link copied to clipboard'
          : 'አገናኝ ወደ ክሊፕቦርድ ተገልብጧል',
        'info'
      );
    }
  };

  const handlePrintAnalysis = () => {
    window.print();
  };

  const handleCookiesAccept = () => {
    setCookiesAccepted(true);
    setShowCookiesConsent(false);
    localStorage.setItem('medai_cookies', 'accepted');
    
    showToast(
      language === 'en'
        ? 'Cookies preferences saved'
        : 'የኩኪዎች ምርጫዎች ተቀምጠዋል',
      'success'
    );
  };

  const handleCookiesReject = () => {
    setCookiesAccepted(false);
    setShowCookiesConsent(false);
    localStorage.setItem('medai_cookies', 'rejected');
    
    showToast(
      language === 'en'
        ? 'Non-essential cookies rejected'
        : 'አስፈላጊ ያልሆኑ ኩኪዎች ተቀብለዋል',
      'info'
    );
  };

  const handleEmergencyCall = () => {
    if (window.confirm(getText(
      'Call emergency hotline?',
      'አደጋ ሆቴላይን ይደውሉ?'
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
          <FaMapMarkerAlt className="detail-icon" />
          <span>{doctor.hospital} - {doctor.location}</span>
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
          <span className="fee-label">{getText('Consultation Fee:', 'የምክክር ክፍያ:')}</span>
          <span className="fee-amount">{doctor.consultationFee}</span>
        </div>
        <button className="book-appointment-btn">
          {getText('Book Appointment', 'ምዝገባ ያድርጉ')}
        </button>
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
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill"
                    style={{ width: `${condition.confidence}%` }}
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
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
        
        <div className="result-section warning">
          <FaExclamationTriangle />
          <p><strong>{getText('When to seek medical help:', 'መቼ ማደርያ እንደሚገባ:')}</strong> {analysisResult.whenToSeekHelp}</p>
        </div>
        
        <div className="result-section">
          <h4>{getText('Suggested Specialists', 'የተመከሩ ባለሙያዎች')}</h4>
          <div className="specialists-tags">
            {analysisResult.suggestedSpecialists.map((spec, index) => (
              <span key={index} className="specialist-tag">{spec}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ===== MAIN RENDER =====
  return (
    <div className="medai-app">
      {/* Skip to main content */}
      <a href="#main-content" className="skip-to-main">
        {getText('Skip to main content', 'ወደ ዋና ይዘት ብለህ ሂድ')}
      </a>

      {/* Language Selector */}
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

      {/* Main Container */}
      <div className="container" id="main-content">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <FaHeartbeat />
            <h1>{getText('MedAI', 'ሜድኤይ')}</h1>
          </div>
          <p className="tagline">
            {getText(
              'Intelligent Medical Consultation & Doctor Recommendation',
              'የጤና ምክር እና ዶክተር የማጣቀሻ ስርዓት'
            )}
          </p>
          
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
                    aria-describedby="symptomsHint"
                    aria-invalid={!!errors.symptoms}
                  />
                  <button 
                    className="voice-btn"
                    onClick={() => startVoiceRecording('symptoms')}
                    aria-label={getText('Voice input for symptoms', 'ለምልክቶች ድምፅ አሰራር')}
                  >
                    <FaMicrophone />
                    <span className="pulse"></span>
                  </button>
                </div>
                <p id="symptomsHint" className="input-hint">
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
                <p id="ageHint" className="input-hint">
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
                  />
                  <button 
                    className="voice-btn"
                    onClick={() => startVoiceRecording('medicalHistory')}
                    aria-label={getText('Voice input for medical history', 'ለጤና ታሪክ ድምፅ አሰራር')}
                  >
                    <FaMicrophone />
                  </button>
                </div>
                <p id="historyHint" className="input-hint">
                  {getText(
                    'Mention medications, chronic conditions, or surgeries',
                    'መድሃኒቶች፣ የረዥም ጊዜ ችግሮች፣ ወይም ቀዶ ህክምናዎችን ያስታውሱ'
                  )}
                </p>
              </div>

              {/* Analyze Button */}
              <button 
                id="analyzeBtn"
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
                    <p className="placeholder-text">
                      {getText('Your analysis will appear here...', 'ትንተናዎ እዚህ ይታያል...')}
                    </p>
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
                    aria-invalid={!!errors.matchSymptoms}
                  />
                  <button 
                    className="voice-btn"
                    onClick={() => startVoiceRecording('matchSymptoms')}
                    aria-label={getText('Voice input for specialist matching', 'ለባለሙያ ማጣጣል ድምፅ አሰራር')}
                  >
                    <FaMicrophone />
                  </button>
                </div>
                <p id="matchHint" className="input-hint">
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
                  >
                    <FaLocationCrosshairs />
                  </button>
                </div>
                <p id="locationHint" className="input-hint">
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
                  >
                    <FaMagic />
                    <span>{getText('Auto-detect', 'ራስ መርምር')}</span>
                  </button>
                </div>
                <p id="specialtyHint" className="input-hint">
                  {getText(
                    'Select or let AI suggest the best specialty',
                    'ምረጥ ወይም ኤአይ ምርጡን ሙያ እንዲጠቁም ፍቀድ'
                  )}
                </p>
              </div>

              {/* Find Doctors Button */}
              <button 
                id="findDoctorsBtn"
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
                      id="availabilityFilter"
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
                      id="insuranceFilter"
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
                      <FaUserMd />
                      <p>{getText('No doctors match your filters', 'ከአጣሪዎት ጋር የሚስማሙ ዶክተሮች አልተገኙም')}</p>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <FaUserMd />
                      <p>{getText('Your matched doctors will appear here', 'የተመከሩ ዶክተሮች እዚህ ይታያሉ')}</p>
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
          <div className="feature-card">
            <div className="feature-icon">
              <FaBrain />
            </div>
            <h3>{getText('AI-Powered Diagnosis', 'በኤአይ የሚሰራ ህክምና')}</h3>
            <p>
              {getText(
                'Advanced symptom analysis using large language models trained on medical data.',
                'በጤና ውሂብ ላይ የተሰለፈ ትላልቅ የቋንቋ ሞዴሎችን በመጠቀም የተሻሻለ የምልክት ትንተና።'
              )}
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaHandshake />
            </div>
            <h3>{getText('Smart Matching', 'ማስተናገድ')}</h3>
            <p>
              {getText(
                'Find the perfect doctor based on symptoms, location, insurance, and availability.',
                'በምልክቶች፣ ቦታ፣ ኢንሹራንስ እና መገኘት ላይ በመመርኮዝ ተስማሚ ዶክተር ያግኙ።'
              )}
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaCalendarCheck />
            </div>
            <h3>{getText('Easy Scheduling', 'ቀላል የጊዜ ሰሌዳ')}</h3>
            <p>
              {getText(
                'Book appointments instantly with real-time availability and automatic reminders.',
                'በቅጽበታዊ መገኘት እና በራስ-ሰር አስታውሻዎች ወዲያውኑ ምዝገባ ያድርጉ።'
              )}
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3>{getText('Privacy First', 'ግላዊነት በመጀመሪያ')}</h3>
            <p>
              {getText(
                'Your medical data is encrypted, secure, and never stored without your consent.',
                'የጤና ውሂብዎ ተመስገን፣ ደህንነቱ የተጠበቀ እና ያለ ፈቃድዎ በጭራሽ አይከማችም።'
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
                <li><a href="#">{getText('Privacy Policy', 'የግላዊነት ፖሊሲ')}</a></li>
                <li><a href="#">{getText('Terms of Service', 'የአገልግሎት ውሎች')}</a></li>
                <li><a href="#">{getText('Contact Us', 'አግኙን')}</a></li>
                <li><a href="#">{getText('Help Center', 'የእርዳታ ማዕከል')}</a></li>
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
      {isVoiceModalOpen && (
        <div className="voice-modal" role="dialog">
          <div className="voice-modal-content">
            <div className="voice-modal-header">
              <h3>{getText('Voice Input', 'ድምፅ አሰራር')}</h3>
              <button 
                className="close-modal"
                onClick={() => setIsVoiceModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="voice-modal-body">
              <div className="voice-animation">
                <div className="voice-circle">
                  <FaMicrophone />
                </div>
                <div className="voice-waves">
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                </div>
              </div>
              <p className="voice-instruction">
                {isRecording 
                  ? getText('Speak now... Your voice is being recorded', 'አሁን ተናገሩ... ድምጽዎ እየተመዘገበ ነው')
                  : getText('Recording stopped. Click submit to use text.', 'ማስቀጠል ተቆምቷል። ጽሑፉን ለመጠቀም አስገባን ጠቅ ያድርጉ።')
                }
              </p>
              <div className="voice-text-preview">
                {voiceInput || getText('No speech detected yet...', 'እስካሁን ድምፅ አልተገኘም...')}
              </div>
            </div>
            <div className="voice-modal-footer">
              <button 
                className="voice-stop"
                onClick={stopVoiceRecording}
                disabled={!isRecording}
              >
                <FaStopCircle />
                <span>{getText('Stop Recording', 'ማስቀጠል አቁም')}</span>
              </button>
              <button 
                className="voice-submit"
                onClick={applyVoiceInput}
                disabled={!voiceInput.trim()}
              >
                <FaCheckCircle />
                <span>{getText('Use Text', 'ጽሑፍ አስገባ')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookies Consent */}
      {showCookiesConsent && (
        <div className="cookies-consent">
          <div className="cookies-content">
            <FaCookieBite />
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
      )}

      {/* Emergency Hotline Banner */}
      <div className="emergency-hotline">
        <FaAmbulance />
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