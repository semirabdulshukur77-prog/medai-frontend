// src/components/RightDoctorBar.jsx
import React, { useState } from 'react';
import { 
  FaUserMd, FaStar, FaMapMarkerAlt,
  FaCalendarCheck, FaPhone, FaVideo
} from 'react-icons/fa';

const RightDoctorBar = () => {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({
    specialty: '',
    location: '',
    availability: ''
  });
  
  return (
    <div className="right-doctor-bar">
      <h1>Find the Right Doctor</h1>
      {/* Advanced doctor search and matching */}
    </div>
  );
};
export default RightDoctorBar;