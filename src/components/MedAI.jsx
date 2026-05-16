import React, { useState } from 'react';
import { FaHeartbeat, FaBrain, FaUserMd, FaMicrophone, FaSearch, FaLanguage, FaGlobeAfrica, FaCommentMedical, FaUser, FaHistory, FaStethoscope, FaMapMarkerAlt, FaShieldAlt, FaSearchPlus, FaHospital, FaStar, FaPhone, FaCalendarCheck, FaStopCircle, FaMap } from 'react-icons/fa';
import './MedAI.css';
const MedAI = () => {
  const [language, setLanguage] = useState('en');
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [matchSymptoms, setMatchSymptoms] = useState('');
  const [location, setLocation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isFindingDoctors, setIsFindingDoctors] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageAnalysis, setImageAnalysis] = useState(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const getText = (enText, amText) => language === 'en' ? enText : amText;
  const mockDoctors = [
    { id: 1, name: 'Dr. Alemayehu Tadesse', specialty: 'Cardiologist', hospital: 'St. Paul\'s Hospital', location: 'Addis Ababa', rating: 4.8, experience: '15 years', fee: '500 ETB' },
    { id: 2, name: 'Dr. Sophia Mekonnen', specialty: 'Neurologist', hospital: 'Black Lion Hospital', location: 'Addis Ababa', rating: 4.9, experience: '12 years', fee: '600 ETB' },
    { id: 3, name: 'Dr. Yohannes Assefa', specialty: 'Pediatrician', hospital: 'Tikur Anbessa Hospital', location: 'Addis Ababa', rating: 4.7, experience: '8 years', fee: '400 ETB' },
  ];
  const cities = ['Addis Ababa', 'Nairobi', 'Kampala', 'Kigali', 'Accra', 'Lagos', 'Cairo', 'Johannesburg', 'Cape Town'];
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(getText('Speech recognition not supported', 'የድምጽ መለየት አይደገፍም'));
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'en' ? 'en-US' : 'am-ET';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      setSymptoms(event.results[0][0].transcript);
    };
    recognition.start();
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageAnalysis(null);
    }
  };
  const handleImageAnalysis = async () => {
    if (!selectedImage) {
      alert(getText('Please select an image first', 'እባክዎ መጀመሪያ ምስል ይምረጡ'));
      return;
    }
    setIsAnalyzingImage(true);
    setImageAnalysis(null);
    try {
      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput.files[0];
      if (!file) throw new Error('No file selected');
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch('http://localhost:8000/api/radiology/analyze', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(`Backend error: ${response.status}`);
      const result = await response.json();
      let analysisText = '';
      if (result.analysis && result.analysis.prediction) {
        analysisText = result.analysis.prediction.map(p => `${p.condition}: ${(p.probability * 100).toFixed(1)}%`).join('\n');
      } else {
        analysisText = JSON.stringify(result);
      }
      setImageAnalysis({ summary: getText('Analysis Results:', 'የትንተና ውጤቶች:'), details: analysisText });
    } catch (error) {
      console.error('Image analysis error:', error);
      setImageAnalysis({ summary: getText('Error connecting to backend.', 'ከተገላቢጦሽ ጋር መገናኘት አልተቻለም።'), details: error.message });
    } finally {
      setIsAnalyzingImage(false);
    }
  };
  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      alert(getText('Please describe your symptoms', 'እባክዎ ምልክቶችዎን ይግለጹ'));
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        possibleConditions: ['Migraine (85%)', 'Tension Headache (70%)', 'Vertigo (60%)'],
        recommendations: ['Rest in a quiet, dark room', 'Stay hydrated', 'Avoid caffeine']
      });
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };
  const handleFindDoctors = () => {
    if (!matchSymptoms.trim()) {
      alert(getText('Enter symptoms for matching', 'ለማጣጣል ምልክቶች ያስገቡ'));
      return;
    }
    setIsFindingDoctors(true);
    setTimeout(() => {
      setDoctors(mockDoctors);
      setIsFindingDoctors(false);
    }, 1500);
  };
  return (
    <div className="medai-app">
      <div className="language-selector">
        <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}><FaLanguage /> ENGLISH</button>
        <button className={`lang-btn ${language === 'am' ? 'active' : ''}`} onClick={() => setLanguage('am')}><FaGlobeAfrica /> አማርኛ</button>
      </div>
      <header className="header">
        <div className="logo"><FaHeartbeat className="logo-icon" /><div className="logo-text"><h1>MedAI</h1><p className="logo-subtitle">{getText('Intelligent Healthcare Assistant', 'የውስጠ-ማህበረሰብ ጤና አጋዥ')}</p></div></div>
      </header>
      <div className="important-notice"><FaShieldAlt /><p>{getText('MedAI is a smart healthcare assistant designed to help you understand symptoms, explore possible health concerns, and find appropriate medical specialists.', 'ሜድኤአይ ምልክቶችን ለመረዳት፣ ሊሆኑ የሚችሉ የጤና ጭንቀቶችን ለማሰስ እና ተገቢ የሕክምና ባለሙያዎችን ለማግኘት የተነደፈ ብልህ የጤና አጋዥ ነው።')}</p></div>
      <main className="main-content">
        <section className="consultation-section"><div className="card"><div className="card-header"><h2><FaBrain /> {getText('Consultation Chat', 'የምክክር ቻት')}</h2></div>
          <div className="input-group"><label>{getText('Type or speak your symptoms/questions', 'ምልክቶችዎን/ጥያቄዎችዎን ይተይቡ ወይም ይናገሩ')}</label>
            <div className="input-with-voice"><textarea className="symptoms-input" placeholder={getText('e.g., headache for 3 days...', 'ለምሳሌ፣ ራስ ምታት ለ3 ቀናት...')} value={symptoms} onChange={(e) => setSymptoms(e.target.value)} rows={3} /><button className="voice-btn" onClick={startVoiceInput}>{isListening ? <FaStopCircle /> : <FaMicrophone />}</button></div></div>
          <div className="input-row"><div className="input-group half"><label>{getText('Age', 'እድሜ')}</label><input type="number" placeholder="30" value={age} onChange={(e) => setAge(e.target.value)} /></div><div className="input-group half"><label>{getText('Gender', 'ጾታ')}</label><select value={gender} onChange={(e) => setGender(e.target.value)}><option value="">{getText('Select', 'ምረጥ')}</option><option value="Male">{getText('Male', 'ወንድ')}</option><option value="Female">{getText('Female', 'ሴት')}</option></select></div></div>
          <div className="input-group"><label>{getText('Medical History (Optional)', 'የጤና ታሪክ (አማራጭ)')}</label><textarea placeholder={getText('Previous conditions, allergies, medications...', 'ያለፉ ችግሮች፣ አለርጂዎች፣ መድሃኒቶች...')} value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} rows={2} /></div>
          <button className="primary-btn analyze-btn" onClick={handleAnalyze} disabled={isAnalyzing}>{isAnalyzing ? <><FaBrain /> {getText('Analyzing...', 'በመተንተን ላይ...')}</> : <><FaSearch /> {getText('Analyze Symptoms', 'ምልክቶችን ይተንትኑ')}</>}</button>
          {showResults && analysisResult && (<div className="analysis-results"><h3>{getText('Analysis Results', 'የትንተና ውጤቶች')}</h3><div className="result-section"><h4>{getText('Possible Conditions', 'ሊሆኑ የሚችሉ በሽታዎች')}</h4><ul>{analysisResult.possibleConditions.map((c, i) => <li key={i}>{c}</li>)}</ul></div><div className="result-section"><h4>{getText('Recommendations', 'ምክሮች')}</h4><ul>{analysisResult.recommendations.map((r, i) => <li key={i}>{r}</li>)}</ul></div></div>)}
        </div></section>
        <section className="specialist-section"><div className="card"><div className="card-header"><h2><FaUserMd /> {getText('Find a Specialist', 'ስፔሻሊስት ያግኙ')}</h2></div>
          <div className="input-group"><label>{getText('Symptoms', 'ምልክቶች')}</label><textarea placeholder={getText('e.g., chest tightness, shortness of breath...', 'ለምሳሌ፣ የደረት መጨናነቅ፣ የትንፋሽ እጥረት...')} value={matchSymptoms} onChange={(e) => setMatchSymptoms(e.target.value)} rows={2} /></div>
          <div className="input-group"><label>{getText('Location', 'ቦታ')}</label><select value={location} onChange={(e) => setLocation(e.target.value)}><option value="">{getText('Select city', 'ከተማ ምረጥ')}</option>{cities.map(city => <option key={city} value={city}>{city}</option>)}</select></div>
          <button className="primary-btn find-btn" onClick={handleFindDoctors} disabled={isFindingDoctors}>{isFindingDoctors ? <>{getText('Finding...', 'በመፈለግ ላይ...')}</> : <><FaSearchPlus /> {getText('Get Recommendations', 'ምክሮችን ያግኙ')}</>}</button>
          <div className="map-container"><div className="simple-map"><FaMap size={40} /><p>{getText('📍 Map showing healthcare facilities near', '📍 በአቅራቢያ ያሉ የጤና ተቋማትን የሚያሳይ ካርታ')} {location || getText('selected location', 'የተመረጠ ቦታ')}</p><div className="map-placeholder">{cities.filter(c => c.toLowerCase().includes(location.toLowerCase()) || !location).slice(0, 5).map(city => <span key={city} className="map-marker">📍 {city}</span>)}</div></div></div>
          {doctors.length > 0 && (<div className="doctors-list"><h3>{getText('Recommended Specialists', 'የሚመከሩ ባለሙያዎች')}</h3>{doctors.map(doctor => (<div key={doctor.id} className="doctor-card"><div className="doctor-info"><h4>{doctor.name}</h4><p><FaStethoscope /> {doctor.specialty}</p><p><FaHospital /> {doctor.hospital}</p><p><FaMapMarkerAlt /> {doctor.location}</p><p><FaStar /> {doctor.rating} ⭐ | {doctor.experience}</p><p className="fee">{doctor.fee}</p></div><div className="doctor-actions"><button className="call-btn"><FaPhone /> {getText('Call', 'ደውል')}</button><button className="book-btn"><FaCalendarCheck /> {getText('Book', 'ቀጠሮ ያዙ')}</button></div></div>))}</div>)}
        </div></section>
      </main>
      <section className="image-analyzer-section"><div className="card"><h2>{getText('Medical Image Analyzer', 'የሕክምና ምስል ተንታኝ')}</h2><p>{getText('Upload X-ray/CT/MRI for AI-assisted analysis', 'ለኤአአይ የታገዘ ትንተና ኤክስሬይ/ሲቲ/ኤምአርአይ ይስቀሉ')}</p><div className="image-upload"><input type="file" accept="image/*" onChange={handleImageUpload} /><button className="secondary-btn" onClick={handleImageAnalysis} disabled={isAnalyzingImage}>{isAnalyzingImage ? getText('Analyzing...', 'በመተንተን ላይ...') : getText('Analyze', 'ተንትን')}</button></div>{selectedImage && <img src={selectedImage} alt="Medical" className="preview-image" />}{imageAnalysis && (<div className="image-analysis-result"><h4>{imageAnalysis.summary}</h4>{imageAnalysis.details && (<pre className="analysis-details">{imageAnalysis.details}</pre>)}</div>)}</div></section>
      <div className="privacy-notice"><FaShieldAlt /><p>{getText('Privacy note: Avoid sharing names, phone numbers, or addresses. Share only what is needed for health context.', 'የግላዊነት ማስታወሻ፡ ስሞችን፣ ስልክ ቁጥሮችን ወይም አድራሻዎችን ከማጋራት ይቆጠቡ። ለጤና አውድ የሚፈለገውን ብቻ ያጋሩ።')}</p></div>
      <footer className="footer"><p>© 2025 MedAI - {getText('Intelligent Healthcare Assistant', 'የውስጠ-ማህበረሰብ ጤና አጋዥ')}</p></footer>
    </div>
  );
};
export default MedAI;
