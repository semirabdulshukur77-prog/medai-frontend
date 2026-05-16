// src/components/EthiopiaMap.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaMapMarkerAlt, 
  FaHospital, 
  FaAmbulance, 
  FaUserMd, 
  FaSearch, 
  FaFilter, 
  FaRoute,
  FaPhone,
  FaDirections,
  FaStar,
  FaClock,
  FaShieldAlt,
  FaPlus,
  FaMinus,
  FaCrosshairs,
  FaDownload,
  FaPrint,
  FaShareAlt,
  FaInfoCircle,
  FaBed,
  FaStethoscope,
  FaHeartbeat,
  FaSyringe,
  FaFirstAid,
  FaMap
} from 'react-icons/fa';
import { ethiopianMedicalData } from '../data/ethiopianMedicalData';
import './EthiopiaMap.css';

const EthiopiaMap = () => {
  const mapRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    specialty: 'all',
    emergency: false,
    insurance: 'all'
  });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [userLocation, setUserLocation] = useState(null);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [directions, setDirections] = useState(null);

  // Ethiopian regions coordinates for map rendering
  const ethiopianRegions = [
    {
      id: 1,
      name: 'Addis Ababa',
      coordinates: { x: 50, y: 30 },
      color: '#3b82f6',
      facilities: ethiopianMedicalData.getHealthcareFacilitiesByCity('Addis Ababa')
    },
    {
      id: 2,
      name: 'Amhara',
      coordinates: { x: 40, y: 15 },
      color: '#10b981',
      facilities: [...ethiopianMedicalData.getHealthcareFacilitiesByCity('Bahir Dar'), 
                  ...ethiopianMedicalData.getHealthcareFacilitiesByCity('Gondar')]
    },
    {
      id: 3,
      name: 'Oromia',
      coordinates: { x: 55, y: 40 },
      color: '#8b5cf6',
      facilities: [...ethiopianMedicalData.getHealthcareFacilitiesByCity('Adama'), 
                  ...ethiopianMedicalData.getHealthcareFacilitiesByCity('Jimma')]
    },
    {
      id: 4,
      name: 'Tigray',
      coordinates: { x: 60, y: 10 },
      color: '#ef4444',
      facilities: ethiopianMedicalData.getHealthcareFacilitiesByCity('Mekelle')
    },
    {
      id: 5,
      name: 'Sidama',
      coordinates: { x: 65, y: 55 },
      color: '#f59e0b',
      facilities: ethiopianMedicalData.getHealthcareFacilitiesByCity('Hawassa')
    },
    {
      id: 6,
      name: 'Dire Dawa',
      coordinates: { x: 70, y: 35 },
      color: '#ec4899',
      facilities: ethiopianMedicalData.getHealthcareFacilitiesByCity('Dire Dawa')
    },
    {
      id: 7,
      name: 'Harari',
      coordinates: { x: 72, y: 32 },
      color: '#06b6d4',
      facilities: ethiopianMedicalData.getHealthcareFacilitiesByCity('Harar')
    },
    {
      id: 8,
      name: 'Benishangul-Gumuz',
      coordinates: { x: 25, y: 25 },
      color: '#84cc16',
      facilities: ethiopianMedicalData.getHealthcareFacilitiesByCity('Assosa')
    }
  ];

  // Filtered facilities based on search and filters
  const filteredFacilities = React.useMemo(() => {
    let facilities = [];
    
    if (selectedCity) {
      facilities = ethiopianMedicalData.getHealthcareFacilitiesByCity(selectedCity);
    } else {
      // Get all facilities
      facilities = ethiopianMedicalData.healthcareFacilities;
    }
    
    // Apply search filter
    if (searchQuery) {
      facilities = facilities.filter(facility =>
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply type filter
    if (filters.type !== 'all') {
      facilities = facilities.filter(facility => facility.type === filters.type);
    }
    
    // Apply emergency filter
    if (filters.emergency) {
      facilities = facilities.filter(facility => facility.emergency);
    }
    
    // Apply insurance filter
    if (filters.insurance !== 'all') {
      facilities = facilities.filter(facility => 
        facility.insurance && facility.insurance.includes(filters.insurance)
      );
    }
    
    return facilities;
  }, [selectedCity, searchQuery, filters]);

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Addis Ababa if location access denied
          setUserLocation({ lat: 9.032, lng: 38.7468 });
        }
      );
    } else {
      console.error('Geolocation not supported');
      setUserLocation({ lat: 9.032, lng: 38.7468 });
    }
  };

  // Initialize user location
  useEffect(() => {
    getUserLocation();
  }, []);

  // Handle city click on map
  const handleCityClick = (cityName) => {
    setSelectedCity(cityName);
    setSelectedFacility(null);
    setDirections(null);
  };

  // Handle facility click
  const handleFacilityClick = (facility) => {
    setSelectedFacility(facility);
    setDirections(null);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic is handled in filteredFacilities memo
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      type: 'all',
      specialty: 'all',
      emergency: false,
      insurance: 'all'
    });
    setSearchQuery('');
    setSelectedCity(null);
    setSelectedFacility(null);
  };

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get directions to facility
  const getDirections = (facility) => {
    if (!userLocation || !facility.coordinates) return null;
    
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      facility.coordinates.lat,
      facility.coordinates.lng
    );
    
    const estimatedTime = Math.round((distance / 40) * 60); // Assuming 40km/h average speed
    
    return {
      distance: distance.toFixed(1),
      time: estimatedTime,
      from: 'Your Location',
      to: facility.name
    };
  };

  // Handle call facility
  const handleCallFacility = (phoneNumber) => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  // Handle get directions
  const handleGetDirections = (facility) => {
    if (facility.coordinates) {
      const directions = getDirections(facility);
      setDirections(directions);
      
      // Open in Google Maps if available
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates.lat},${facility.coordinates.lng}`;
      window.open(mapsUrl, '_blank');
    }
  };

  // Handle zoom in
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  // Handle zoom out
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  // Handle print map
  const handlePrint = () => {
    window.print();
  };

  // Handle share
  const handleShare = async () => {
    const shareData = {
      title: 'Ethiopia Healthcare Map',
      text: 'Explore healthcare facilities across Ethiopia',
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  // Render facility type icon
  const renderFacilityIcon = (type) => {
    switch (type) {
      case 'Tertiary':
        return <FaHospital className="icon tertiary" />;
      case 'Secondary':
        return <FaHospital className="icon secondary" />;
      case 'Primary':
        return <FaFirstAid className="icon primary" />;
      case 'Health Center':
        return <FaHeartbeat className="icon health-center" />;
      case 'Specialized':
        return <FaStethoscope className="icon specialized" />;
      default:
        return <FaMapMarkerAlt className="icon default" />;
    }
  };

  // Render facility card
  const renderFacilityCard = (facility) => (
    <div 
      key={facility.id} 
      className={`facility-card ${selectedFacility?.id === facility.id ? 'selected' : ''}`}
      onClick={() => handleFacilityClick(facility)}
    >
      <div className="facility-card-header">
        <div className="facility-type">
          {renderFacilityIcon(facility.type)}
          <span className="facility-type-label">{facility.type}</span>
        </div>
        {facility.emergency && (
          <div className="emergency-badge">
            <FaAmbulance /> EMERGENCY
          </div>
        )}
      </div>
      
      <div className="facility-card-body">
        <h4>{facility.name}</h4>
        <div className="facility-details">
          <div className="detail-item">
            <FaMapMarkerAlt />
            <span>{facility.city}</span>
          </div>
          <div className="detail-item">
            <FaBed />
            <span>{facility.beds || 'N/A'} Beds</span>
          </div>
          <div className="detail-item">
            <FaUserMd />
            <span>{facility.doctors || 'N/A'} Doctors</span>
          </div>
          {facility.rating && (
            <div className="detail-item">
              <FaStar />
              <span>{facility.rating}/5</span>
            </div>
          )}
        </div>
        
        <div className="facility-services">
          {facility.services?.slice(0, 3).map((service, index) => (
            <span key={index} className="service-tag">{service}</span>
          ))}
          {facility.services && facility.services.length > 3 && (
            <span className="service-tag">+{facility.services.length - 3} more</span>
          )}
        </div>
      </div>
      
      <div className="facility-card-footer">
        <button 
          className="btn btn-outline btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleCallFacility(facility.contact);
          }}
        >
          <FaPhone /> Call
        </button>
        <button 
          className="btn btn-primary btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleGetDirections(facility);
          }}
        >
          <FaDirections /> Directions
        </button>
      </div>
    </div>
  );

  // Render selected facility details
  const renderFacilityDetails = () => {
    if (!selectedFacility) return null;
    
    const doctorsInFacility = ethiopianMedicalData.doctors.filter(
      doctor => doctor.hospital === selectedFacility.name && doctor.city === selectedFacility.city
    );
    
    const distanceInfo = userLocation && selectedFacility.coordinates 
      ? getDirections(selectedFacility)
      : null;
    
    return (
      <div className="facility-details-panel">
        <div className="details-header">
          <h3>{selectedFacility.name}</h3>
          <button 
            className="close-details"
            onClick={() => setSelectedFacility(null)}
          >
            &times;
          </button>
        </div>
        
        <div className="details-content">
          <div className="facility-overview">
            <div className="overview-item">
              <FaHospital />
              <div>
                <strong>Type:</strong> {selectedFacility.type}
              </div>
            </div>
            <div className="overview-item">
              <FaMapMarkerAlt />
              <div>
                <strong>Location:</strong> {selectedFacility.city}
              </div>
            </div>
            <div className="overview-item">
              <FaBed />
              <div>
                <strong>Capacity:</strong> {selectedFacility.beds || 'N/A'} beds
              </div>
            </div>
            <div className="overview-item">
              <FaUserMd />
              <div>
                <strong>Medical Staff:</strong> {selectedFacility.doctors || 'N/A'} doctors
              </div>
            </div>
          </div>
          
          {distanceInfo && (
            <div className="distance-info">
              <h4>Distance Information</h4>
              <div className="distance-details">
                <div className="distance-item">
                  <FaRoute />
                  <span>{distanceInfo.distance} km</span>
                </div>
                <div className="distance-item">
                  <FaClock />
                  <span>~{distanceInfo.time} min</span>
                </div>
              </div>
            </div>
          )}
          
          {selectedFacility.services && (
            <div className="services-section">
              <h4>Available Services</h4>
              <div className="services-grid">
                {selectedFacility.services.map((service, index) => (
                  <div key={index} className="service-item">
                    <FaCheckCircle />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedFacility.insurance && (
            <div className="insurance-section">
              <h4>Insurance Accepted</h4>
              <div className="insurance-tags">
                {selectedFacility.insurance.map((ins, index) => (
                  <span key={index} className="insurance-tag">
                    <FaShieldAlt /> {ins}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {doctorsInFacility.length > 0 && (
            <div className="doctors-section">
              <h4>Available Doctors</h4>
              <div className="doctors-list">
                {doctorsInFacility.slice(0, 3).map(doctor => (
                  <div key={doctor.id} className="doctor-item">
                    <div className="doctor-info">
                      <strong>{doctor.name}</strong>
                      <span>{doctor.specialty}</span>
                    </div>
                    <span className="doctor-fee">{doctor.consultationFee} ETB</span>
                  </div>
                ))}
                {doctorsInFacility.length > 3 && (
                  <div className="more-doctors">
                    +{doctorsInFacility.length - 3} more doctors available
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="action-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => handleCallFacility(selectedFacility.contact)}
            >
              <FaPhone /> Call Now
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => handleGetDirections(selectedFacility)}
            >
              <FaDirections /> Get Directions
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render map view
  const renderMapView = () => (
    <div className="map-container">
      <div 
        ref={mapRef}
        className="ethiopia-map"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* Map background */}
        <div className="map-background">
          {/* Simplified Ethiopia shape */}
          <svg viewBox="0 0 100 100" className="ethiopia-shape">
            <path d="M30,20 L50,10 L70,20 L80,40 L75,60 L60,70 L40,75 L25,60 L20,40 Z" 
                  fill="#f0f9ff" stroke="#3b82f6" strokeWidth="0.5"/>
          </svg>
        </div>
        
        {/* Region markers */}
        {ethiopianRegions.map(region => (
          <div
            key={region.id}
            className="region-marker"
            style={{
              left: `${region.coordinates.x}%`,
              top: `${region.coordinates.y}%`,
              backgroundColor: region.color,
              transform: `scale(${selectedCity === region.name ? 1.2 : 1})`
            }}
            onClick={() => handleCityClick(region.name)}
            title={`${region.name}: ${region.facilities.length} facilities`}
          >
            <FaMapMarkerAlt />
            <div className="region-info">
              <span className="region-name">{region.name}</span>
              <span className="facility-count">{region.facilities.length}</span>
            </div>
          </div>
        ))}
        
        {/* User location marker */}
        {userLocation && (
          <div
            className="user-location-marker"
            style={{
              left: '50%',
              top: '30%'
            }}
            title="Your Location"
          >
            <FaCrosshairs />
          </div>
        )}
        
        {/* Selected facility marker */}
        {selectedFacility && selectedFacility.coordinates && (
          <div
            className="selected-facility-marker"
            style={{
              left: '50%',
              top: '30%',
              animation: 'pulse 2s infinite'
            }}
            title={selectedFacility.name}
          >
            <FaHospital />
          </div>
        )}
        
        {/* Zoom controls */}
        <div className="zoom-controls">
          <button className="zoom-btn" onClick={handleZoomIn}>
            <FaPlus />
          </button>
          <button className="zoom-btn" onClick={handleZoomOut}>
            <FaMinus />
          </button>
        </div>
        
        {/* Map legend */}
        <div className="map-legend">
          <h5>Legend</h5>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color tertiary"></div>
              <span>Tertiary Hospital</span>
            </div>
            <div className="legend-item">
              <div className="legend-color secondary"></div>
              <span>Secondary Hospital</span>
            </div>
            <div className="legend-item">
              <div className="legend-color primary"></div>
              <span>Primary Hospital</span>
            </div>
            <div className="legend-item">
              <div className="legend-color health-center"></div>
              <span>Health Center</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map info panel */}
      <div className="map-info-panel">
        <h3>Ethiopia Healthcare Facilities Map</h3>
        <p>Click on regions to view healthcare facilities. {filteredFacilities.length} facilities found.</p>
        
        <div className="stats-grid">
          <div className="stat-card">
            <FaHospital />
            <div>
              <strong>{filteredFacilities.length}</strong>
              <span>Facilities</span>
            </div>
          </div>
          <div className="stat-card">
            <FaBed />
            <div>
              <strong>{filteredFacilities.reduce((sum, f) => sum + (f.beds || 0), 0)}</strong>
              <span>Total Beds</span>
            </div>
          </div>
          <div className="stat-card">
            <FaUserMd />
            <div>
              <strong>{filteredFacilities.reduce((sum, f) => sum + (f.doctors || 0), 0)}</strong>
              <span>Doctors</span>
            </div>
          </div>
          <div className="stat-card">
            <FaAmbulance />
            <div>
              <strong>{filteredFacilities.filter(f => f.emergency).length}</strong>
              <span>Emergency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render list view
  const renderListView = () => (
    <div className="list-view">
      <div className="list-header">
        <h3>Healthcare Facilities List</h3>
        <div className="list-stats">
          Showing {filteredFacilities.length} of {ethiopianMedicalData.healthcareFacilities.length} facilities
        </div>
      </div>
      
      <div className="facilities-list">
        {filteredFacilities.length > 0 ? (
          filteredFacilities.map(facility => renderFacilityCard(facility))
        ) : (
          <div className="no-results">
            <FaHospital className="no-results-icon" />
            <h4>No facilities found</h4>
            <p>Try adjusting your search or filters</p>
            <button className="btn btn-outline" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="ethiopia-map-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>
            <FaMap /> Ethiopia Healthcare Map
          </h1>
          <p>Explore and locate healthcare facilities across Ethiopia</p>
        </div>
        
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handlePrint}>
            <FaPrint /> Print
          </button>
          <button className="btn btn-outline" onClick={handleShare}>
            <FaShareAlt /> Share
          </button>
          <button className="btn btn-primary" onClick={getUserLocation}>
            <FaCrosshairs /> Locate Me
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="controls-section">
        <form onSubmit={handleSearch} className="search-bar">
          <div className="search-input-group">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search facilities, cities, or specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
        
        <div className="filters-section">
          <div className="filter-group">
            <label>
              <FaFilter /> Facility Type:
            </label>
            <select 
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Tertiary">Tertiary</option>
              <option value="Secondary">Secondary</option>
              <option value="Primary">Primary</option>
              <option value="Health Center">Health Center</option>
              <option value="Specialized">Specialized</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>
              <FaShieldAlt /> Insurance:
            </label>
            <select 
              value={filters.insurance}
              onChange={(e) => handleFilterChange('insurance', e.target.value)}
            >
              <option value="all">All Insurance</option>
              <option value="Ethiopian Insurance">Ethiopian Insurance</option>
              <option value="Private">Private</option>
              <option value="NHIF">NHIF</option>
              <option value="International">International</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.emergency}
                onChange={(e) => handleFilterChange('emergency', e.target.checked)}
              />
              <FaAmbulance /> Emergency Only
            </label>
          </div>
          
          <button className="btn btn-text" onClick={clearFilters}>
            Clear All
          </button>
        </div>
        
        <div className="view-toggle">
          <button 
            className={`view-btn ${viewMode === 'map' ? 'active' : ''}`}
            onClick={() => setViewMode('map')}
          >
            <FaMap /> Map View
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <FaHospital /> List View
          </button>
        </div>
      </div>

      {/* Selected City Banner */}
      {selectedCity && (
        <div className="city-banner">
          <div className="city-info">
            <h3>{selectedCity} Healthcare Facilities</h3>
            <p>
              {filteredFacilities.length} facilities • 
              {filteredFacilities.reduce((sum, f) => sum + (f.beds || 0), 0)} beds • 
              {filteredFacilities.filter(f => f.emergency).length} emergency centers
            </p>
          </div>
          <button 
            className="btn btn-outline"
            onClick={() => setSelectedCity(null)}
          >
            View All Ethiopia
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Map/List View */}
        <div className={`content-area ${selectedFacility ? 'with-details' : ''}`}>
          {viewMode === 'map' ? renderMapView() : renderListView()}
        </div>
        
        {/* Selected Facility Details */}
        {selectedFacility && renderFacilityDetails()}
      </div>

      {/* Directions Panel */}
      {directions && (
        <div className="directions-panel">
          <div className="directions-header">
            <h4>
              <FaRoute /> Directions
            </h4>
            <button 
              className="close-directions"
              onClick={() => setDirections(null)}
            >
              &times;
            </button>
          </div>
          <div className="directions-content">
            <div className="route-info">
              <div className="route-from">
                <strong>From:</strong> {directions.from}
              </div>
              <div className="route-to">
                <strong>To:</strong> {directions.to}
              </div>
              <div className="route-stats">
                <div className="route-stat">
                  <FaRoute />
                  <span>{directions.distance} km</span>
                </div>
                <div className="route-stat">
                  <FaClock />
                  <span>~{directions.time} minutes</span>
                </div>
              </div>
            </div>
            <div className="route-actions">
              <button className="btn btn-primary">
                <FaDirections /> Open in Maps
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Section */}
      <div className="statistics-section">
        <h3>Ethiopia Healthcare Statistics</h3>
        <div className="stats-grid-large">
          <div className="stat-card-large">
            <FaHospital className="stat-icon" />
            <div className="stat-content">
              <div className="stat-number">
                {ethiopianMedicalData.healthcareFacilities.length}
              </div>
              <div className="stat-label">Healthcare Facilities</div>
            </div>
          </div>
          
          <div className="stat-card-large">
            <FaUserMd className="stat-icon" />
            <div className="stat-content">
              <div className="stat-number">
                {ethiopianMedicalData.doctors.length}+
              </div>
              <div className="stat-label">Medical Doctors</div>
            </div>
          </div>
          
          <div className="stat-card-large">
            <FaBed className="stat-icon" />
            <div className="stat-content">
              <div className="stat-number">
                {ethiopianMedicalData.healthcareFacilities.reduce((sum, f) => sum + (f.beds || 0), 0)}+
              </div>
              <div className="stat-label">Hospital Beds</div>
            </div>
          </div>
          
          <div className="stat-card-large">
            <FaAmbulance className="stat-icon" />
            <div className="stat-content">
              <div className="stat-number">
                {ethiopianMedicalData.healthcareFacilities.filter(f => f.emergency).length}
              </div>
              <div className="stat-label">Emergency Centers</div>
            </div>
          </div>
          
          <div className="stat-card-large">
            <FaShieldAlt className="stat-icon" />
            <div className="stat-content">
              <div className="stat-number">6</div>
              <div className="stat-label">Insurance Providers</div>
            </div>
          </div>
          
          <div className="stat-card-large">
            <FaHeartbeat className="stat-icon" />
            <div className="stat-content">
              <div className="stat-number">10</div>
              <div className="stat-label">Major Cities Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Section */}
      <div className="emergency-section">
        <div className="emergency-content">
          <div className="emergency-info">
            <FaAmbulance className="emergency-icon" />
            <div>
              <h3>Emergency Services</h3>
              <p>Immediate access to emergency healthcare services across Ethiopia</p>
            </div>
          </div>
          <div className="emergency-contacts">
            <div className="emergency-contact">
              <strong>Police Emergency:</strong> 911
            </div>
            <div className="emergency-contact">
              <strong>Ambulance:</strong> 907
            </div>
            <div className="emergency-contact">
              <strong>Fire Service:</strong> 939
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="map-footer">
        <div className="footer-content">
          <div className="footer-info">
            <h4>
              <FaMapMarkerAlt /> Ethiopia Healthcare Map
            </h4>
            <p>Comprehensive directory of healthcare facilities across Ethiopia</p>
            <div className="footer-stats">
              <span>Data updated: December 2024</span>
              <span>Coverage: 10 cities, 215+ facilities</span>
            </div>
          </div>
          <div className="footer-actions">
            <button className="btn btn-outline">
              <FaDownload /> Download Data
            </button>
            <button className="btn btn-outline">
              <FaInfoCircle /> Report Issue
            </button>
          </div>
        </div>
        <div className="footer-note">
          <FaInfoCircle /> Note: This map provides approximate locations. Contact facilities directly for exact addresses and availability.
        </div>
      </div>
    </div>
  );
};

// Helper component for check icon
const FaCheckCircle = () => (
  <svg className="check-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

export default EthiopiaMap;