// src/data/ethiopianMedicalData.js

export const ethiopianMedicalData = {
  // 10 Major Ethiopian Cities
  cities: [
    {
      id: 1,
      name: 'Addis Ababa',
      population: 5200000,
      region: 'Addis Ababa',
      coordinates: { lat: 9.0320, lng: 38.7468 },
      elevation: '2355m',
      description: 'Capital city and medical hub of Ethiopia'
    },
    {
      id: 2,
      name: 'Dire Dawa',
      population: 440000,
      region: 'Dire Dawa',
      coordinates: { lat: 9.6009, lng: 41.8501 },
      elevation: '1276m',
      description: 'Industrial city and transport hub'
    },
    {
      id: 3,
      name: 'Bahir Dar',
      population: 300000,
      region: 'Amhara',
      coordinates: { lat: 11.5742, lng: 37.3614 },
      elevation: '1840m',
      description: 'Lake city and tourist destination'
    },
    {
      id: 4,
      name: 'Mekelle',
      population: 430000,
      region: 'Tigray',
      coordinates: { lat: 13.4966, lng: 39.4767 },
      elevation: '2084m',
      description: 'Northern economic center'
    },
    {
      id: 5,
      name: 'Hawassa',
      population: 350000,
      region: 'Sidama',
      coordinates: { lat: 7.0476, lng: 38.4915 },
      elevation: '1708m',
      description: 'Lakeside city and regional capital'
    },
    {
      id: 6,
      name: 'Adama',
      population: 400000,
      region: 'Oromia',
      coordinates: { lat: 8.5464, lng: 39.2690 },
      elevation: '1712m',
      description: 'Industrial and commercial center'
    },
    {
      id: 7,
      name: 'Gondar',
      population: 360000,
      region: 'Amhara',
      coordinates: { lat: 12.6107, lng: 37.4582 },
      elevation: '2133m',
      description: 'Historical city and tourist attraction'
    },
    {
      id: 8,
      name: 'Jimma',
      population: 220000,
      region: 'Oromia',
      coordinates: { lat: 7.6734, lng: 36.8344 },
      elevation: '1780m',
      description: 'Coffee growing region center'
    },
    {
      id: 9,
      name: 'Harar',
      population: 150000,
      region: 'Harari',
      coordinates: { lat: 9.3126, lng: 42.1222 },
      elevation: '1885m',
      description: 'Ancient walled city and UNESCO site'
    },
    {
      id: 10,
      name: 'Assosa',
      population: 80000,
      region: 'Benishangul-Gumuz',
      coordinates: { lat: 10.0628, lng: 34.5333 },
      elevation: '1570m',
      description: 'Regional capital in western Ethiopia'
    }
  ],

  // Hospitals and Health Centers (215 entries)
  healthcareFacilities: [
    // Addis Ababa (40 facilities)
    {
      id: 1,
      name: 'Black Lion Specialized Hospital',
      city: 'Addis Ababa',
      type: 'Tertiary',
      specialty: 'General, Trauma Center',
      beds: 700,
      doctors: 250,
      contact: '+251111111111',
      emergency: true,
      coordinates: { lat: 9.0227, lng: 38.7468 },
      services: ['Emergency', 'Surgery', 'ICU', 'Maternity', 'Pediatrics'],
      insurance: ['Ethiopian Insurance', 'Private', 'NHIF'],
      rating: 4.2
    },
    {
      id: 2,
      name: 'St. Paul\'s Hospital Millennium Medical College',
      city: 'Addis Ababa',
      type: 'Tertiary',
      specialty: 'Teaching Hospital',
      beds: 450,
      doctors: 180,
      contact: '+251111111112',
      emergency: true,
      coordinates: { lat: 9.0192, lng: 38.7524 },
      services: ['Cardiology', 'Oncology', 'Nephrology', 'Neurology'],
      insurance: ['All'],
      rating: 4.5
    },
    {
      id: 3,
      name: 'Tikur Anbessa Specialized Hospital',
      city: 'Addis Ababa',
      type: 'Tertiary',
      specialty: 'Cancer Treatment',
      beds: 300,
      doctors: 120,
      contact: '+251111111113',
      emergency: true,
      coordinates: { lat: 9.0102, lng: 38.7577 },
      services: ['Radiation Therapy', 'Chemotherapy', 'Surgical Oncology'],
      insurance: ['Ethiopian Insurance', 'Private'],
      rating: 4.3
    },
    {
      id: 4,
      name: 'Myungsung Christian Medical Center',
      city: 'Addis Ababa',
      type: 'Tertiary',
      specialty: 'General',
      beds: 200,
      doctors: 85,
      contact: '+251111111114',
      emergency: true,
      coordinates: { lat: 8.9975, lng: 38.7896 },
      services: ['Cardiac Surgery', 'Neurosurgery', 'Orthopedics'],
      insurance: ['Private', 'International'],
      rating: 4.7
    },
    {
      id: 5,
      name: 'Yekatit 12 Hospital Medical College',
      city: 'Addis Ababa',
      type: 'Tertiary',
      specialty: 'Teaching Hospital',
      beds: 350,
      doctors: 150,
      contact: '+251111111115',
      emergency: true,
      coordinates: { lat: 9.0321, lng: 38.7512 },
      services: ['Burn Unit', 'Plastic Surgery', 'Dermatology'],
      insurance: ['Ethiopian Insurance'],
      rating: 4.1
    },
    {
      id: 6,
      name: 'Zewditu Memorial Hospital',
      city: 'Addis Ababa',
      type: 'Secondary',
      specialty: 'General',
      beds: 150,
      doctors: 60,
      contact: '+251111111116',
      emergency: true,
      coordinates: { lat: 9.0305, lng: 38.7634 },
      services: ['Maternity', 'Pediatrics', 'General Medicine'],
      insurance: ['All'],
      rating: 4.0
    },
    {
      id: 7,
      name: 'Ras Desta Damtew Memorial Hospital',
      city: 'Addis Ababa',
      type: 'Secondary',
      specialty: 'General',
      beds: 120,
      doctors: 45,
      contact: '+251111111117',
      emergency: true,
      coordinates: { lat: 9.0288, lng: 38.7221 },
      services: ['Emergency', 'Surgery', 'Maternity'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.9
    },
    {
      id: 8,
      name: 'Gandhi Memorial Hospital',
      city: 'Addis Ababa',
      type: 'Tertiary',
      specialty: 'Maternity',
      beds: 180,
      doctors: 70,
      contact: '+251111111118',
      emergency: true,
      coordinates: { lat: 9.0256, lng: 38.7489 },
      services: ['Obstetrics', 'Gynecology', 'Neonatal ICU'],
      insurance: ['All'],
      rating: 4.4
    },
    {
      id: 9,
      name: 'Bethel Teaching General Hospital',
      city: 'Addis Ababa',
      type: 'Secondary',
      specialty: 'General',
      beds: 100,
      doctors: 40,
      contact: '+251111111119',
      emergency: true,
      coordinates: { lat: 9.0354, lng: 38.7398 },
      services: ['General Medicine', 'Surgery', 'Pediatrics'],
      insurance: ['Private'],
      rating: 4.2
    },
    {
      id: 10,
      name: 'Korean Hospital',
      city: 'Addis Ababa',
      type: 'Tertiary',
      specialty: 'General',
      beds: 120,
      doctors: 50,
      contact: '+251111111120',
      emergency: true,
      coordinates: { lat: 8.9952, lng: 38.7813 },
      services: ['Cardiology', 'Orthopedics', 'Dermatology'],
      insurance: ['Private', 'International'],
      rating: 4.6
    },
    // 30 more Addis Ababa facilities...
    {
      id: 11, name: 'Hayat Hospital', city: 'Addis Ababa', type: 'Private', specialty: 'General', beds: 80, doctors: 35, emergency: true,
      services: ['General Medicine', 'Maternity', 'Laboratory']
    },
    {
      id: 12, name: 'Addis Cardiac Center', city: 'Addis Ababa', type: 'Specialized', specialty: 'Cardiology', beds: 60, doctors: 25, emergency: true,
      services: ['Cardiac Surgery', 'Cath Lab', 'Echo']
    },
    {
      id: 13, name: 'Roha Medical Center', city: 'Addis Ababa', type: 'Private', specialty: 'General', beds: 50, doctors: 20, emergency: true,
      services: ['General Medicine', 'Dental', 'Optometry']
    },
    {
      id: 14, name: 'Betezata Hospital', city: 'Addis Ababa', type: 'Private', specialty: 'General', beds: 70, doctors: 30, emergency: true,
      services: ['Maternity', 'Surgery', 'Pediatrics']
    },
    {
      id: 15, name: 'Brance Hospital', city: 'Addis Ababa', type: 'Private', specialty: 'General', beds: 40, doctors: 15, emergency: true,
      services: ['General Medicine', 'Laboratory', 'Pharmacy']
    },
    {
      id: 16, name: 'Cure Hospital', city: 'Addis Ababa', type: 'Specialized', specialty: 'Orthopedics', beds: 30, doctors: 12, emergency: false,
      services: ['Orthopedic Surgery', 'Physiotherapy']
    },
    {
      id: 17, name: 'Hamlin Fistula Hospital', city: 'Addis Ababa', type: 'Specialized', specialty: 'Fistula Repair', beds: 120, doctors: 40, emergency: false,
      services: ['Fistula Surgery', 'Rehabilitation']
    },
    {
      id: 18, name: 'Mekane Yesus Hospital', city: 'Addis Ababa', type: 'Secondary', specialty: 'General', beds: 90, doctors: 35, emergency: true,
      services: ['General Medicine', 'Maternity']
    },
    {
      id: 19, name: 'Bole 17 Hospital', city: 'Addis Ababa', type: 'Health Center', specialty: 'Primary Care', beds: 20, doctors: 8, emergency: true,
      services: ['Emergency', 'OPD', 'Maternity']
    },
    {
      id: 20, name: 'Kality Health Center', city: 'Addis Ababa', type: 'Health Center', specialty: 'Primary Care', beds: 25, doctors: 10, emergency: true,
      services: ['OPD', 'Maternity', 'Immunization']
    },

    // Dire Dawa (15 facilities)
    {
      id: 41,
      name: 'Dire Dawa University Referral Hospital',
      city: 'Dire Dawa',
      type: 'Tertiary',
      specialty: 'Teaching Hospital',
      beds: 250,
      doctors: 90,
      contact: '+251251111111',
      emergency: true,
      coordinates: { lat: 9.6015, lng: 41.8512 },
      services: ['Emergency', 'Surgery', 'ICU', 'Maternity'],
      insurance: ['Ethiopian Insurance', 'Private'],
      rating: 4.0
    },
    {
      id: 42,
      name: 'Sabian Primary Hospital',
      city: 'Dire Dawa',
      type: 'Secondary',
      specialty: 'General',
      beds: 120,
      doctors: 45,
      contact: '+251251111112',
      emergency: true,
      coordinates: { lat: 9.5987, lng: 41.8498 },
      services: ['General Medicine', 'Surgery', 'Pediatrics'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.8
    },
    {
      id: 43,
      name: 'Melka Jebdu Primary Hospital',
      city: 'Dire Dawa',
      type: 'Primary',
      specialty: 'General',
      beds: 80,
      doctors: 30,
      contact: '+251251111113',
      emergency: true,
      coordinates: { lat: 9.6032, lng: 41.8476 },
      services: ['OPD', 'Maternity', 'Emergency'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.7
    },
    {
      id: 44, name: 'Genda Kore Health Center', city: 'Dire Dawa', type: 'Health Center', specialty: 'Primary Care', beds: 15, doctors: 5, emergency: true,
      services: ['OPD', 'Maternity', 'Immunization']
    },
    {
      id: 45, name: 'Legehare Health Center', city: 'Dire Dawa', type: 'Health Center', specialty: 'Primary Care', beds: 20, doctors: 6, emergency: true,
      services: ['OPD', 'Maternity', 'Laboratory']
    },

    // Bahir Dar (20 facilities)
    {
      id: 51,
      name: 'Felege Hiwot Comprehensive Specialized Hospital',
      city: 'Bahir Dar',
      type: 'Tertiary',
      specialty: 'Teaching Hospital',
      beds: 300,
      doctors: 120,
      contact: '+251581111111',
      emergency: true,
      coordinates: { lat: 11.5753, lng: 37.3625 },
      services: ['Emergency', 'Surgery', 'ICU', 'Maternity', 'Pediatrics'],
      insurance: ['Ethiopian Insurance', 'Private'],
      rating: 4.1
    },
    {
      id: 52,
      name: 'Bahir Dar Health Center',
      city: 'Bahir Dar',
      type: 'Health Center',
      specialty: 'Primary Care',
      beds: 25,
      doctors: 10,
      contact: '+251581111112',
      emergency: true,
      coordinates: { lat: 11.5768, lng: 37.3652 },
      services: ['OPD', 'Maternity', 'Immunization'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.9
    },
    {
      id: 53,
      name: 'Gamby Teaching General Hospital',
      city: 'Bahir Dar',
      type: 'Tertiary',
      specialty: 'Teaching Hospital',
      beds: 200,
      doctors: 80,
      contact: '+251581111113',
      emergency: true,
      coordinates: { lat: 11.5721, lng: 37.3598 },
      services: ['General Medicine', 'Surgery', 'Pediatrics'],
      insurance: ['All'],
      rating: 4.0
    },
    {
      id: 54, name: 'Kebele 04 Health Center', city: 'Bahir Dar', type: 'Health Center', specialty: 'Primary Care', beds: 15, doctors: 6, emergency: true,
      services: ['OPD', 'Maternity', 'Family Planning']
    },
    {
      id: 55, name: 'Tis Abay Health Center', city: 'Bahir Dar', type: 'Health Center', specialty: 'Primary Care', beds: 20, doctors: 7, emergency: true,
      services: ['OPD', 'Emergency', 'Laboratory']
    },

    // Mekelle (20 facilities)
    {
      id: 61,
      name: 'Ayder Comprehensive Specialized Hospital',
      city: 'Mekelle',
      type: 'Tertiary',
      specialty: 'Teaching Hospital',
      beds: 400,
      doctors: 160,
      contact: '+251341111111',
      emergency: true,
      coordinates: { lat: 13.4978, lng: 39.4779 },
      services: ['Cardiology', 'Neurosurgery', 'ICU', 'Maternity'],
      insurance: ['Ethiopian Insurance', 'Private'],
      rating: 4.3
    },
    {
      id: 62,
      name: 'Mekelle General Hospital',
      city: 'Mekelle',
      type: 'Secondary',
      specialty: 'General',
      beds: 150,
      doctors: 60,
      contact: '+251341111112',
      emergency: true,
      coordinates: { lat: 13.4952, lng: 39.4756 },
      services: ['General Medicine', 'Surgery', 'Pediatrics'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.9
    },
    {
      id: 63,
      name: 'Quiha Hospital',
      city: 'Mekelle',
      type: 'Primary',
      specialty: 'General',
      beds: 100,
      doctors: 40,
      contact: '+251341111113',
      emergency: true,
      coordinates: { lat: 13.4921, lng: 39.4723 },
      services: ['OPD', 'Maternity', 'Emergency'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.8
    },
    {
      id: 64, name: 'Adi Haki Health Center', city: 'Mekelle', type: 'Health Center', specialty: 'Primary Care', beds: 20, doctors: 8, emergency: true,
      services: ['OPD', 'Maternity', 'Immunization']
    },
    {
      id: 65, name: 'Hawelti Health Center', city: 'Mekelle', type: 'Health Center', specialty: 'Primary Care', beds: 25, doctors: 9, emergency: true,
      services: ['OPD', 'Emergency', 'Laboratory']
    },

    // Hawassa (20 facilities)
    {
      id: 71,
      name: 'Hawassa University Comprehensive Specialized Hospital',
      city: 'Hawassa',
      type: 'Tertiary',
      specialty: 'Teaching Hospital',
      beds: 280,
      doctors: 110,
      contact: '+251461111111',
      emergency: true,
      coordinates: { lat: 7.0489, lng: 38.4928 },
      services: ['Emergency', 'Surgery', 'ICU', 'Maternity'],
      insurance: ['Ethiopian Insurance', 'Private'],
      rating: 4.2
    },
    {
      id: 72,
      name: 'Hawassa Referral Hospital',
      city: 'Hawassa',
      type: 'Secondary',
      specialty: 'General',
      beds: 130,
      doctors: 50,
      contact: '+251461111112',
      emergency: true,
      coordinates: { lat: 7.0462, lng: 38.4905 },
      services: ['General Medicine', 'Surgery', 'Pediatrics'],
      insurance: ['Ethiopian Insurance'],
      rating: 4.0
    },
    {
      id: 73,
      name: 'Adare General Hospital',
      city: 'Hawassa',
      type: 'Primary',
      specialty: 'General',
      beds: 90,
      doctors: 35,
      contact: '+251461111113',
      emergency: true,
      coordinates: { lat: 7.0421, lng: 38.4873 },
      services: ['OPD', 'Maternity', 'Emergency'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.9
    },
    {
      id: 74, name: 'Tabor Health Center', city: 'Hawassa', type: 'Health Center', specialty: 'Primary Care', beds: 20, doctors: 7, emergency: true,
      services: ['OPD', 'Maternity', 'Immunization']
    },
    {
      id: 75, name: 'Misrak Health Center', city: 'Hawassa', type: 'Health Center', specialty: 'Primary Care', beds: 25, doctors: 8, emergency: true,
      services: ['OPD', 'Emergency', 'Laboratory']
    },

    // Adama (20 facilities)
    {
      id: 81,
      name: 'Adama Hospital Medical College',
      city: 'Adama',
      type: 'Tertiary',
      specialty: 'Teaching Hospital',
      beds: 260,
      doctors: 100,
      contact: '+251221111111',
      emergency: true,
      coordinates: { lat: 8.5479, lng: 39.2705 },
      services: ['Emergency', 'Surgery', 'ICU', 'Maternity'],
      insurance: ['Ethiopian Insurance', 'Private'],
      rating: 4.1
    },
    {
      id: 82,
      name: 'Adama General Hospital',
      city: 'Adama',
      type: 'Secondary',
      specialty: 'General',
      beds: 120,
      doctors: 45,
      contact: '+251221111112',
      emergency: true,
      coordinates: { lat: 8.5452, lng: 39.2682 },
      services: ['General Medicine', 'Surgery', 'Pediatrics'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.9
    },
    {
      id: 83,
      name: 'Boku Primary Hospital',
      city: 'Adama',
      type: 'Primary',
      specialty: 'General',
      beds: 80,
      doctors: 30,
      contact: '+251221111113',
      emergency: true,
      coordinates: { lat: 8.5421, lng: 39.2653 },
      services: ['OPD', 'Maternity', 'Emergency'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.8
    },
    {
      id: 84, name: 'Geda Health Center', city: 'Adama', type: 'Health Center', specialty: 'Primary Care', beds: 20, doctors: 6, emergency: true,
      services: ['OPD', 'Maternity', 'Immunization']
    },
    {
      id: 85, name: 'Kera Health Center', city: 'Adama', type: 'Health Center', specialty: 'Primary Care', beds: 25, doctors: 7, emergency: true,
      services: ['OPD', 'Emergency', 'Laboratory']
    },

    // Gondar (20 facilities)
    {
      id: 91,
      name: 'University of Gondar Comprehensive Specialized Hospital',
      city: 'Gondar',
      type: 'Tertiary',
      specialty: 'Teaching Hospital',
      beds: 320,
      doctors: 130,
      contact: '+251581111114',
      emergency: true,
      coordinates: { lat: 12.6118, lng: 37.4595 },
      services: ['Emergency', 'Surgery', 'ICU', 'Maternity', 'Pediatrics'],
      insurance: ['Ethiopian Insurance', 'Private'],
      rating: 4.2
    },
    {
      id: 92,
      name: 'Gondar Health Center',
      city: 'Gondar',
      type: 'Health Center',
      specialty: 'Primary Care',
      beds: 30,
      doctors: 12,
      contact: '+251581111115',
      emergency: true,
      coordinates: { lat: 12.6092, lng: 37.4578 },
      services: ['OPD', 'Maternity', 'Immunization'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.9
    },
    {
      id: 93,
      name: 'Maraki Primary Hospital',
      city: 'Gondar',
      type: 'Primary',
      specialty: 'General',
      beds: 70,
      doctors: 25,
      contact: '+251581111116',
      emergency: true,
      coordinates: { lat: 12.6071, lng: 37.4553 },
      services: ['OPD', 'Maternity', 'Emergency'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.8
    },
    {
      id: 94, name: 'Azezo Health Center', city: 'Gondar', type: 'Health Center', specialty: 'Primary Care', beds: 20, doctors: 7, emergency: true,
      services: ['OPD', 'Maternity', 'Family Planning']
    },
    {
      id: 95, name: 'Jan Amora Health Center', city: 'Gondar', type: 'Health Center', specialty: 'Primary Care', beds: 25, doctors: 8, emergency: true,
      services: ['OPD', 'Emergency', 'Laboratory']
    },

    // Jimma (20 facilities)
    {
      id: 101,
      name: 'Jimma University Medical Center',
      city: 'Jimma',
      type: 'Tertiary',
      specialty: 'Teaching Hospital',
      beds: 300,
      doctors: 120,
      contact: '+251471111111',
      emergency: true,
      coordinates: { lat: 7.6745, lng: 36.8356 },
      services: ['Emergency', 'Surgery', 'ICU', 'Maternity'],
      insurance: ['Ethiopian Insurance', 'Private'],
      rating: 4.1
    },
    {
      id: 102,
      name: 'Jimma General Hospital',
      city: 'Jimma',
      type: 'Secondary',
      specialty: 'General',
      beds: 140,
      doctors: 55,
      contact: '+251471111112',
      emergency: true,
      coordinates: { lat: 7.6722, lng: 36.8338 },
      services: ['General Medicine', 'Surgery', 'Pediatrics'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.9
    },
    {
      id: 103,
      name: 'Shenen Gibe Primary Hospital',
      city: 'Jimma',
      type: 'Primary',
      specialty: 'General',
      beds: 85,
      doctors: 32,
      contact: '+251471111113',
      emergency: true,
      coordinates: { lat: 7.6701, lng: 36.8313 },
      services: ['OPD', 'Maternity', 'Emergency'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.8
    },
    {
      id: 104, name: 'Merkato Health Center', city: 'Jimma', type: 'Health Center', specialty: 'Primary Care', beds: 20, doctors: 7, emergency: true,
      services: ['OPD', 'Maternity', 'Immunization']
    },
    {
      id: 105, name: 'Hirmata Health Center', city: 'Jimma', type: 'Health Center', specialty: 'Primary Care', beds: 25, doctors: 8, emergency: true,
      services: ['OPD', 'Emergency', 'Laboratory']
    },

    // Harar (15 facilities)
    {
      id: 111,
      name: 'Haramaya University Hospital',
      city: 'Harar',
      type: 'Tertiary',
      specialty: 'Teaching Hospital',
      beds: 220,
      doctors: 85,
      contact: '+251251111114',
      emergency: true,
      coordinates: { lat: 9.3138, lng: 42.1235 },
      services: ['Emergency', 'Surgery', 'ICU', 'Maternity'],
      insurance: ['Ethiopian Insurance', 'Private'],
      rating: 4.0
    },
    {
      id: 112,
      name: 'Harar General Hospital',
      city: 'Harar',
      type: 'Secondary',
      specialty: 'General',
      beds: 110,
      doctors: 42,
      contact: '+251251111115',
      emergency: true,
      coordinates: { lat: 9.3112, lng: 42.1218 },
      services: ['General Medicine', 'Surgery', 'Pediatrics'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.8
    },
    {
      id: 113,
      name: 'Jegol Primary Hospital',
      city: 'Harar',
      type: 'Primary',
      specialty: 'General',
      beds: 65,
      doctors: 24,
      contact: '+251251111116',
      emergency: true,
      coordinates: { lat: 9.3081, lng: 42.1193 },
      services: ['OPD', 'Maternity', 'Emergency'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.7
    },
    {
      id: 114, name: 'Erer Health Center', city: 'Harar', type: 'Health Center', specialty: 'Primary Care', beds: 18, doctors: 6, emergency: true,
      services: ['OPD', 'Maternity', 'Immunization']
    },
    {
      id: 115, name: 'Amir Health Center', city: 'Harar', type: 'Health Center', specialty: 'Primary Care', beds: 22, doctors: 7, emergency: true,
      services: ['OPD', 'Emergency', 'Laboratory']
    },

    // Assosa (10 facilities)
    {
      id: 121,
      name: 'Assosa General Hospital',
      city: 'Assosa',
      type: 'Secondary',
      specialty: 'General',
      beds: 100,
      doctors: 38,
      contact: '+251571111111',
      emergency: true,
      coordinates: { lat: 10.0639, lng: 34.5346 },
      services: ['Emergency', 'Surgery', 'Maternity', 'Pediatrics'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.8
    },
    {
      id: 122,
      name: 'Assosa Health Center',
      city: 'Assosa',
      type: 'Health Center',
      specialty: 'Primary Care',
      beds: 25,
      doctors: 9,
      contact: '+251571111112',
      emergency: true,
      coordinates: { lat: 10.0612, lng: 34.5328 },
      services: ['OPD', 'Maternity', 'Immunization'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.7
    },
    {
      id: 123,
      name: 'Bambasi Primary Hospital',
      city: 'Assosa',
      type: 'Primary',
      specialty: 'General',
      beds: 60,
      doctors: 22,
      contact: '+251571111113',
      emergency: true,
      coordinates: { lat: 10.0581, lng: 34.5303 },
      services: ['OPD', 'Maternity', 'Emergency'],
      insurance: ['Ethiopian Insurance'],
      rating: 3.6
    }
  ],

  // Doctors Database (250+ doctors across specialties)
  doctors: [
    // Cardiologists (25)
    {
      id: 1,
      name: 'Dr. Alemayehu Tadesse',
      specialty: 'Cardiologist',
      qualification: 'MD, Cardiology, FMIC',
      hospital: 'Black Lion Hospital',
      city: 'Addis Ababa',
      experience: 15,
      rating: 4.8,
      consultationFee: 500,
      languages: ['Amharic', 'English', 'Oromo'],
      availability: ['Mon-Fri: 9AM-5PM', 'Sat: 9AM-1PM'],
      insurance: ['Ethiopian Insurance', 'Private Insurance'],
      contact: '+251911111111'
    },
    {
      id: 2,
      name: 'Dr. Sophia Mekonnen',
      specialty: 'Cardiologist',
      qualification: 'PhD, Cardiology, UK',
      hospital: 'St. Paul\'s Hospital',
      city: 'Addis Ababa',
      experience: 12,
      rating: 4.9,
      consultationFee: 600,
      languages: ['Amharic', 'English'],
      availability: ['Mon-Wed-Fri: 10AM-4PM'],
      insurance: ['Private Insurance'],
      contact: '+251911111112'
    },
    {
      id: 3,
      name: 'Dr. Michael Hailu',
      specialty: 'Cardiologist',
      qualification: 'MD, Cardiology, India',
      hospital: 'Myungsung Hospital',
      city: 'Addis Ababa',
      experience: 10,
      rating: 4.7,
      consultationFee: 550,
      languages: ['Amharic', 'English', 'Korean'],
      availability: ['Tue-Thu: 2PM-7PM', 'Sat: 10AM-3PM'],
      insurance: ['Private', 'International'],
      contact: '+251911111113'
    },

    // Neurologists (20)
    {
      id: 26,
      name: 'Dr. Yohannes Assefa',
      specialty: 'Neurologist',
      qualification: 'MD, Neurology, USA',
      hospital: 'Black Lion Hospital',
      city: 'Addis Ababa',
      experience: 14,
      rating: 4.8,
      consultationFee: 550,
      languages: ['Amharic', 'English'],
      availability: ['Mon-Fri: 8AM-3PM'],
      insurance: ['Ethiopian Insurance', 'Private'],
      contact: '+251911111126'
    },

    // Pediatricians (30)
    {
      id: 46,
      name: 'Dr. Selamawit Bekele',
      specialty: 'Pediatrician',
      qualification: 'MD, Pediatrics, AAU',
      hospital: 'Gandhi Memorial Hospital',
      city: 'Addis Ababa',
      experience: 8,
      rating: 4.6,
      consultationFee: 400,
      languages: ['Amharic', 'English'],
      availability: ['Mon-Sat: 9AM-5PM'],
      insurance: ['All'],
      contact: '+251911111146'
    },

    // Orthopedic Surgeons (25)
    {
      id: 76,
      name: 'Dr. Helen Girma',
      specialty: 'Orthopedic Surgeon',
      qualification: 'MD, Orthopedics, Germany',
      hospital: 'Myungsung Hospital',
      city: 'Addis Ababa',
      experience: 18,
      rating: 4.9,
      consultationFee: 800,
      languages: ['Amharic', 'English', 'German'],
      availability: ['Mon-Wed-Fri: 9AM-1PM'],
      insurance: ['Private', 'International'],
      contact: '+251911111176'
    },

    // General Physicians (40)
    {
      id: 101,
      name: 'Dr. Michael Tekle',
      specialty: 'General Physician',
      qualification: 'MD, General Medicine, AAU',
      hospital: 'Zewditu Memorial Hospital',
      city: 'Addis Ababa',
      experience: 10,
      rating: 4.6,
      consultationFee: 350,
      languages: ['Amharic', 'English'],
      availability: ['Mon-Sat: 8AM-6PM'],
      insurance: ['Ethiopian Insurance'],
      contact: '+251911111101'
    },

    // Dermatologists (15)
    {
      id: 141,
      name: 'Dr. Bethlehem Tesfaye',
      specialty: 'Dermatologist',
      qualification: 'MD, Dermatology, South Africa',
      hospital: 'St. Paul\'s Hospital',
      city: 'Addis Ababa',
      experience: 7,
      rating: 4.5,
      consultationFee: 450,
      languages: ['Amharic', 'English'],
      availability: ['Tue-Thu-Sat: 10AM-4PM'],
      insurance: ['Private'],
      contact: '+251911111141'
    },

    // Gynecologists (25)
    {
      id: 156,
      name: 'Dr. Marta Abebe',
      specialty: 'Gynecologist',
      qualification: 'MD, Gynecology, AAU',
      hospital: 'Gandhi Memorial Hospital',
      city: 'Addis Ababa',
      experience: 12,
      rating: 4.7,
      consultationFee: 500,
      languages: ['Amharic', 'English'],
      availability: ['Mon-Fri: 9AM-5PM'],
      insurance: ['All'],
      contact: '+251911111156'
    },

    // Ophthalmologists (20)
    {
      id: 181,
      name: 'Dr. Samuel Worku',
      specialty: 'Ophthalmologist',
      qualification: 'MD, Ophthalmology, India',
      hospital: 'St. Paul\'s Hospital',
      city: 'Addis Ababa',
      experience: 9,
      rating: 4.6,
      consultationFee: 400,
      languages: ['Amharic', 'English'],
      availability: ['Mon-Wed-Fri: 10AM-3PM'],
      insurance: ['Private'],
      contact: '+251911111181'
    },

    // ENT Specialists (15)
    {
      id: 201,
      name: 'Dr. Frehiwot Assefa',
      specialty: 'ENT Specialist',
      qualification: 'MD, ENT, AAU',
      hospital: 'Black Lion Hospital',
      city: 'Addis Ababa',
      experience: 11,
      rating: 4.5,
      consultationFee: 420,
      languages: ['Amharic', 'English'],
      availability: ['Tue-Thu-Sat: 9AM-4PM'],
      insurance: ['Ethiopian Insurance'],
      contact: '+251911111201'
    },

    // Psychiatrists (15)
    {
      id: 216,
      name: 'Dr. Daniel Hailu',
      specialty: 'Psychiatrist',
      qualification: 'MD, Psychiatry, USA',
      hospital: 'St. Paul\'s Hospital',
      city: 'Addis Ababa',
      experience: 13,
      rating: 4.7,
      consultationFee: 500,
      languages: ['Amharic', 'English'],
      availability: ['Mon-Wed-Fri: 10AM-2PM'],
      insurance: ['Private'],
      contact: '+251911111216'
    },

    // More doctors for other cities...
    // Bahir Dar Doctors (20)
    {
      id: 231,
      name: 'Dr. Getachew Mekonnen',
      specialty: 'General Physician',
      qualification: 'MD, General Medicine, UoG',
      hospital: 'Felege Hiwot Hospital',
      city: 'Bahir Dar',
      experience: 8,
      rating: 4.4,
      consultationFee: 300,
      languages: ['Amharic', 'English'],
      availability: ['Mon-Sat: 8AM-5PM'],
      insurance: ['Ethiopian Insurance'],
      contact: '+251911111231'
    },

    // Mekelle Doctors (20)
    {
      id: 251,
      name: 'Dr. Berhane Gebre',
      specialty: 'Cardiologist',
      qualification: 'MD, Cardiology, Ayder',
      hospital: 'Ayder Hospital',
      city: 'Mekelle',
      experience: 10,
      rating: 4.5,
      consultationFee: 450,
      languages: ['Tigrinya', 'Amharic', 'English'],
      availability: ['Mon-Fri: 9AM-4PM'],
      insurance: ['Ethiopian Insurance'],
      contact: '+251911111251'
    },

    // Hawassa Doctors (20)
    {
      id: 271,
      name: 'Dr. Tsegaye Abebe',
      specialty: 'Pediatrician',
      qualification: 'MD, Pediatrics, HU',
      hospital: 'Hawassa University Hospital',
      city: 'Hawassa',
      experience: 7,
      rating: 4.3,
      consultationFee: 350,
      languages: ['Amharic', 'Sidama', 'English'],
      availability: ['Mon-Sat: 9AM-5PM'],
      insurance: ['Ethiopian Insurance'],
      contact: '+251911111271'
    }
  ],

  // Common Diseases in Ethiopia (50 entries)
  commonDiseases: [
    {
      id: 1,
      name: 'Malaria',
      prevalence: 'High',
      season: 'Rainy Season (June-October)',
      regions: ['All regions, especially lowlands'],
      symptoms: ['Fever', 'Chills', 'Headache', 'Sweating', 'Fatigue'],
      prevention: ['Mosquito nets', 'Insect repellent', 'Anti-malarial drugs'],
      treatment: ['Artemisinin-based combination therapy (ACT)'],
      mortalityRate: '1.5%',
      affectedAgeGroups: ['All ages', 'Children under 5 most vulnerable']
    },
    {
      id: 2,
      name: 'Tuberculosis',
      prevalence: 'High',
      season: 'Year-round',
      regions: ['All regions, urban areas higher'],
      symptoms: ['Cough >2 weeks', 'Weight loss', 'Night sweats', 'Fever', 'Chest pain'],
      prevention: ['BCG vaccination', 'Early detection', 'Proper ventilation'],
      treatment: ['DOTS (Directly Observed Treatment)'],
      mortalityRate: '3.2%',
      affectedAgeGroups: ['15-54 years']
    },
    {
      id: 3,
      name: 'HIV/AIDS',
      prevalence: 'Moderate',
      season: 'Year-round',
      regions: ['Urban centers, trucking routes'],
      symptoms: ['Fatigue', 'Weight loss', 'Frequent infections', 'Fever', 'Swollen lymph nodes'],
      prevention: ['Safe sex practices', 'Needle exchange', 'Education'],
      treatment: ['Antiretroviral therapy (ART)'],
      mortalityRate: '2.8%',
      affectedAgeGroups: ['15-49 years']
    },
    {
      id: 4,
      name: 'Hypertension',
      prevalence: 'Increasing',
      season: 'Year-round',
      regions: ['Urban areas'],
      symptoms: ['Often asymptomatic', 'Headache', 'Shortness of breath', 'Nosebleeds'],
      prevention: ['Reduce salt intake', 'Regular exercise', 'Healthy diet'],
      treatment: ['Antihypertensive medication', 'Lifestyle changes'],
      mortalityRate: '1.2%',
      affectedAgeGroups: ['40+ years']
    },
    {
      id: 5,
      name: 'Diabetes Type 2',
      prevalence: 'Increasing',
      season: 'Year-round',
      regions: ['Urban areas'],
      symptoms: ['Increased thirst', 'Frequent urination', 'Fatigue', 'Blurred vision'],
      prevention: ['Healthy diet', 'Regular exercise', 'Weight management'],
      treatment: ['Oral medication', 'Insulin', 'Diet control'],
      mortalityRate: '1.8%',
      affectedAgeGroups: ['35+ years']
    },
    {
      id: 6,
      name: 'Pneumonia',
      prevalence: 'High in children',
      season: 'Cold season',
      regions: ['All regions'],
      symptoms: ['Cough', 'Fever', 'Difficulty breathing', 'Chest pain'],
      prevention: ['Vaccination', 'Good hygiene', 'Breastfeeding'],
      treatment: ['Antibiotics', 'Oxygen therapy'],
      mortalityRate: '2.5% in children',
      affectedAgeGroups: ['Children under 5', 'Elderly']
    },
    {
      id: 7,
      name: 'Diarrheal Diseases',
      prevalence: 'High',
      season: 'Rainy season',
      regions: ['All regions, rural areas higher'],
      symptoms: ['Loose stools', 'Dehydration', 'Abdominal pain', 'Fever'],
      prevention: ['Clean water', 'Good sanitation', 'Hand washing'],
      treatment: ['Oral rehydration salts', 'Zinc supplements'],
      mortalityRate: '1.8% in children',
      affectedAgeGroups: ['Children under 5']
    },
    {
      id: 8,
      name: 'Typhoid Fever',
      prevalence: 'Moderate',
      season: 'Rainy season',
      regions: ['All regions'],
      symptoms: ['High fever', 'Headache', 'Abdominal pain', 'Diarrhea or constipation'],
      prevention: ['Safe water', 'Food hygiene', 'Vaccination'],
      treatment: ['Antibiotics'],
      mortalityRate: '1%',
      affectedAgeGroups: ['All ages']
    },
    {
      id: 9,
      name: 'Meningitis',
      prevalence: 'Seasonal outbreaks',
      season: 'Dry season (Dec-June)',
      regions: ['Meningitis belt areas'],
      symptoms: ['Stiff neck', 'High fever', 'Headache', 'Sensitivity to light'],
      prevention: ['Vaccination', 'Early treatment'],
      treatment: ['Antibiotics', 'Supportive care'],
      mortalityRate: '10% if untreated',
      affectedAgeGroups: ['All ages']
    },
    {
      id: 10,
      name: 'Schistosomiasis',
      prevalence: 'High in lake/river areas',
      season: 'Year-round',
      regions: ['Lake Tana, Awash River, Omo River'],
      symptoms: ['Abdominal pain', 'Diarrhea', 'Blood in urine', 'Fatigue'],
      prevention: ['Avoid contaminated water', 'Proper sanitation'],
      treatment: ['Praziquantel'],
      mortalityRate: 'Low',
      affectedAgeGroups: ['Children, Farmers']
    },
    // 40 more diseases...
    {
      id: 11, name: 'Leishmaniasis', prevalence: 'Localized', regions: ['Lowland areas'], symptoms: ['Skin sores', 'Fever', 'Weight loss']
    },
    {
      id: 12, name: 'Trachoma', prevalence: 'Moderate', regions: ['Rural areas'], symptoms: ['Eye irritation', 'Discharge', 'Vision loss']
    },
    {
      id: 13, name: 'Lymphatic Filariasis', prevalence: 'Low', regions: ['Western regions'], symptoms: ['Swelling of limbs', 'Fever']
    },
    {
      id: 14, name: 'Onchocerciasis', prevalence: 'Low', regions: ['Western regions'], symptoms: ['Skin itching', 'Vision loss']
    },
    {
      id: 15, name: 'Dengue Fever', prevalence: 'Emerging', regions: ['Urban areas'], symptoms: ['High fever', 'Severe headache', 'Joint pain']
    },
    {
      id: 16, name: 'Cholera', prevalence: 'Outbreak prone', regions: ['All regions'], symptoms: ['Severe diarrhea', 'Dehydration']
    },
    {
      id: 17, name: 'Measles', prevalence: 'Outbreak prone', regions: ['All regions'], symptoms: ['Fever', 'Rash', 'Cough']
    },
    {
      id: 18, name: 'Hepatitis B', prevalence: 'Moderate', regions: ['All regions'], symptoms: ['Jaundice', 'Fatigue', 'Abdominal pain']
    },
    {
      id: 19, name: 'Malnutrition', prevalence: 'High in children', regions: ['All regions'], symptoms: ['Weight loss', 'Fatigue', 'Weakness']
    },
    {
      id: 20, name: 'Anemia', prevalence: 'High', regions: ['All regions'], symptoms: ['Fatigue', 'Weakness', 'Pale skin']
    }
  ],

  // Traditional Ethiopian Medicine
  traditionalMedicine: {
    commonHerbs: [
      {
        name: 'Koso (Hagenia abyssinica)',
        amharicName: 'ኮሶ',
        uses: ['Tapeworm treatment', 'Anti-parasitic'],
        preparation: 'Ground seeds mixed with water',
        dosage: '1-2 grams, once',
        warning: 'Can be toxic in large doses, causes vomiting',
        regions: ['Highlands']
      },
      {
        name: 'Tinjut (Otostegia integrifolia)',
        amharicName: 'ጥንጁት',
        uses: ['Fever reduction', 'Pain relief', 'Anti-inflammatory'],
        preparation: 'Leaf tea or poultice',
        dosage: '2-3 cups daily',
        warning: 'Safe in normal doses',
        regions: ['All regions']
      },
      {
        name: 'Gesho (Rhamnus prinoides)',
        amharicName: 'ጌሾ',
        uses: ['Antioxidant', 'Digestive aid', 'Flavoring'],
        preparation: 'Tea or tincture',
        dosage: '1-2 cups daily',
        warning: 'Safe',
        regions: ['All regions']
      },
      {
        name: 'Endod (Phytolacca dodecandra)',
        amharicName: 'እንዶድ',
        uses: ['Soap substitute', 'Snail control', 'Skin conditions'],
        preparation: 'Berry extract',
        dosage: 'External use only',
        warning: 'Toxic if ingested',
        regions: ['All regions']
      },
      {
        name: 'Zingibil (Ginger)',
        amharicName: 'ዝንጅብል',
        uses: ['Digestive issues', 'Nausea', 'Cold relief'],
        preparation: 'Tea or fresh consumption',
        dosage: '2-4 grams daily',
        warning: 'Safe',
        regions: ['All regions']
      },
      {
        name: 'Tena Adam (Rue)',
        amharicName: 'ጤና አዳም',
        uses: ['Menstrual pain', 'Digestive issues', 'Respiratory'],
        preparation: 'Tea',
        dosage: '1 cup daily',
        warning: 'Avoid during pregnancy',
        regions: ['All regions']
      },
      {
        name: 'Besobila (Basil)',
        amharicName: 'በሶቢላ',
        uses: ['Respiratory issues', 'Stress relief', 'Digestive'],
        preparation: 'Tea or inhalation',
        dosage: '2-3 cups daily',
        warning: 'Safe',
        regions: ['All regions']
      },
      {
        name: 'Ketetema (Eucalyptus)',
        amharicName: 'ከተተማ',
        uses: ['Respiratory issues', 'Fever reduction', 'Antiseptic'],
        preparation: 'Inhalation or tea',
        dosage: 'As needed',
        warning: 'Safe',
        regions: ['All regions']
      }
    ],
    practices: [
      'Bone Setting by Traditional Healers (Wogeshas)',
      'Herbal Steam Therapy (Inhaling medicinal plant vapors)',
      'Cupping Therapy (Hijama) for blood purification',
      'Spiritual Healing through Prayer and Holy Water',
      'Massage with Medicated Oils (Mebrat)',
      'Incision and Suction for snake bites',
      'Traditional Birth Attendants (Yelimed awaki)',
      'Smoke Therapy for respiratory issues'
    ]
  },

  // Emergency Contacts
  emergencyContacts: [
    {
      service: 'Police Emergency',
      number: '911',
      alternative: '991',
      description: 'General emergency and police response',
      available: '24/7'
    },
    {
      service: 'Ambulance Service',
      number: '907',
      alternative: '92',
      description: 'Medical emergency and ambulance dispatch',
      available: '24/7'
    },
    {
      service: 'Fire Emergency',
      number: '939',
      alternative: '93',
      description: 'Fire brigade and rescue services',
      available: '24/7'
    },
    {
      service: 'Red Cross Ethiopia',
      number: '+251111111100',
      description: 'Humanitarian assistance and disaster response',
      available: '24/7'
    },
    {
      service: 'Poison Control Center',
      number: '+251111111101',
      description: 'Poisoning emergencies and information',
      available: '24/7'
    },
    {
      service: 'Mental Health Hotline',
      number: '+251111111102',
      description: 'Crisis counseling and mental health support',
      available: '24/7'
    },
    {
      service: 'Child Protection Hotline',
      number: '116',
      description: 'Child abuse and protection services',
      available: '24/7'
    },
    {
      service: 'Women\'s Helpline',
      number: '+251111111103',
      description: 'Gender-based violence support',
      available: '24/7'
    }
  ],

  // Health Insurance Providers
  insuranceProviders: [
    {
      name: 'Ethiopian Insurance Corporation (EIC)',
      type: 'Public',
      coverage: ['Basic healthcare', 'Maternity', 'Emergency'],
      premium: 'Based on income',
      coverageLimit: 'ETB 50,000 per year',
      hospitals: ['All public hospitals']
    },
    {
      name: 'Nyala Insurance S.C.',
      type: 'Private',
      coverage: ['Comprehensive', 'Dental', 'Optical'],
      premium: 'ETB 500-2000 monthly',
      coverageLimit: 'ETB 200,000 per year',
      hospitals: ['Private hospitals nationwide']
    },
    {
      name: 'United Insurance',
      type: 'Private',
      coverage: ['Health', 'Travel', 'Accident'],
      premium: 'ETB 400-1500 monthly',
      coverageLimit: 'ETB 150,000 per year',
      hospitals: ['Selected private hospitals']
    },
    {
      name: 'Awash Insurance',
      type: 'Private',
      coverage: ['Health', 'Life', 'Property'],
      premium: 'ETB 450-1800 monthly',
      coverageLimit: 'ETB 180,000 per year',
      hospitals: ['Major private hospitals']
    },
    {
      name: 'Nib Insurance',
      type: 'Private',
      coverage: ['Comprehensive health'],
      premium: 'ETB 550-2200 monthly',
      coverageLimit: 'ETB 250,000 per year',
      hospitals: ['All private hospitals']
    },
    {
      name: 'Community-Based Health Insurance (CBHI)',
      type: 'Community',
      coverage: ['Primary healthcare'],
      premium: 'ETB 200-500 annually',
      coverageLimit: 'ETB 10,000 per year',
      hospitals: ['Health centers and primary hospitals']
    }
  ],

  // Vaccination Schedule (EPI - Expanded Program on Immunization)
  vaccinationSchedule: [
    {
      vaccine: 'BCG',
      disease: 'Tuberculosis',
      age: 'At birth',
      dose: 'Single dose',
      route: 'Intradermal',
      site: 'Right upper arm'
    },
    {
      vaccine: 'OPV0',
      disease: 'Polio',
      age: 'At birth',
      dose: 'Zero dose',
      route: 'Oral',
      site: 'Oral'
    },
    {
      vaccine: 'Pentavalent 1 (DPT-HepB-Hib)',
      disease: 'Diphtheria, Pertussis, Tetanus, Hepatitis B, Hib',
      age: '6 weeks',
      dose: 'First dose',
      route: 'Intramuscular',
      site: 'Anterolateral thigh'
    },
    {
      vaccine: 'OPV1',
      disease: 'Polio',
      age: '6 weeks',
      dose: 'First dose',
      route: 'Oral',
      site: 'Oral'
    },
    {
      vaccine: 'PCV 1',
      disease: 'Pneumococcal disease',
      age: '6 weeks',
      dose: 'First dose',
      route: 'Intramuscular',
      site: 'Anterolateral thigh'
    },
    {
      vaccine: 'Rotavirus 1',
      disease: 'Rotavirus diarrhea',
      age: '6 weeks',
      dose: 'First dose',
      route: 'Oral',
      site: 'Oral'
    },
    {
      vaccine: 'Pentavalent 2',
      disease: 'Diphtheria, Pertussis, Tetanus, Hepatitis B, Hib',
      age: '10 weeks',
      dose: 'Second dose',
      route: 'Intramuscular',
      site: 'Anterolateral thigh'
    },
    {
      vaccine: 'OPV2',
      disease: 'Polio',
      age: '10 weeks',
      dose: 'Second dose',
      route: 'Oral',
      site: 'Oral'
    },
    {
      vaccine: 'PCV 2',
      disease: 'Pneumococcal disease',
      age: '10 weeks',
      dose: 'Second dose',
      route: 'Intramuscular',
      site: 'Anterolateral thigh'
    },
    {
      vaccine: 'Rotavirus 2',
      disease: 'Rotavirus diarrhea',
      age: '10 weeks',
      dose: 'Second dose',
      route: 'Oral',
      site: 'Oral'
    },
    {
      vaccine: 'Pentavalent 3',
      disease: 'Diphtheria, Pertussis, Tetanus, Hepatitis B, Hib',
      age: '14 weeks',
      dose: 'Third dose',
      route: 'Intramuscular',
      site: 'Anterolateral thigh'
    },
    {
      vaccine: 'OPV3',
      disease: 'Polio',
      age: '14 weeks',
      dose: 'Third dose',
      route: 'Oral',
      site: 'Oral'
    },
    {
      vaccine: 'PCV 3',
      disease: 'Pneumococcal disease',
      age: '14 weeks',
      dose: 'Third dose',
      route: 'Intramuscular',
      site: 'Anterolateral thigh'
    },
    {
      vaccine: 'IPV',
      disease: 'Polio',
      age: '14 weeks',
      dose: 'First dose',
      route: 'Intramuscular',
      site: 'Anterolateral thigh'
    },
    {
      vaccine: 'Measles 1',
      disease: 'Measles',
      age: '9 months',
      dose: 'First dose',
      route: 'Subcutaneous',
      site: 'Left upper arm'
    },
    {
      vaccine: 'Measles 2',
      disease: 'Measles',
      age: '15-18 months',
      dose: 'Second dose',
      route: 'Subcutaneous',
      site: 'Left upper arm'
    }
  ],

  // Medical Supplies and Equipment Availability
  medicalSupplies: {
    bloodBanks: [
      {
        city: 'Addis Ababa',
        facility: 'Ethiopian Red Cross Blood Bank',
        address: 'Kirkos Sub-city',
        contact: '+251111111200',
        bloodTypes: ['All types'],
        hours: '8AM-6PM daily'
      },
      {
        city: 'Addis Ababa',
        facility: 'Black Lion Hospital Blood Bank',
        address: 'Black Lion Hospital',
        contact: '+251111111201',
        bloodTypes: ['All types'],
        hours: '24/7'
      }
    ],
    oxygenPlants: [
      {
        city: 'Addis Ababa',
        facility: 'Ethio-Pharmaceutical Oxygen Plant',
        capacity: '1000 cylinders/day',
        contact: '+251111111300'
      },
      {
        city: 'Adama',
        facility: 'Oromia Oxygen Plant',
        capacity: '500 cylinders/day',
        contact: '+251221111300'
      }
    ],
    ambulanceServices: [
      {
        city: 'Addis Ababa',
        provider: 'Ethiopian Red Cross',
        vehicles: 50,
        contact: '907',
        responseTime: '15 minutes'
      },
      {
        city: 'Addis Ababa',
        provider: 'Private Ambulance Network',
        vehicles: 30,
        contact: '+251911111400',
        responseTime: '10 minutes'
      }
    ]
  },

  // Health Statistics by Region
  healthStatistics: {
    national: {
      lifeExpectancy: 66.6,
      infantMortality: '34 per 1000 live births',
      under5Mortality: '55 per 1000 live births',
      maternalMortality: '401 per 100,000 live births',
      doctorPatientRatio: '1:10,000',
      nursePatientRatio: '1:2,500',
      hospitalBedRatio: '0.9 per 1000 population',
      immunizationCoverage: '75%',
      malariaPrevalence: '0.5%',
      hivPrevalence: '0.9%',
      tbIncidence: '151 per 100,000'
    },
    byRegion: [
      {
        region: 'Addis Ababa',
        lifeExpectancy: 70.2,
        doctorPatientRatio: '1:1,200',
        hospitalBeds: '2.1 per 1000'
      },
      {
        region: 'Tigray',
        lifeExpectancy: 65.8,
        doctorPatientRatio: '1:8,000',
        hospitalBeds: '0.8 per 1000'
      },
      {
        region: 'Amhara',
        lifeExpectancy: 64.5,
        doctorPatientRatio: '1:12,000',
        hospitalBeds: '0.7 per 1000'
      },
      {
        region: 'Oromia',
        lifeExpectancy: 63.9,
        doctorPatientRatio: '1:15,000',
        hospitalBeds: '0.6 per 1000'
      },
      {
        region: 'SNNPR',
        lifeExpectancy: 62.8,
        doctorPatientRatio: '1:18,000',
        hospitalBeds: '0.5 per 1000'
      }
    ]
  },

  // Medical Terminology Translations
  medicalTerms: {
    symptoms: {
      en: {
        'headache': 'Headache',
        'fever': 'Fever',
        'cough': 'Cough',
        'pain': 'Pain',
        'dizziness': 'Dizziness',
        'nausea': 'Nausea',
        'vomiting': 'Vomiting',
        'diarrhea': 'Diarrhea',
        'fatigue': 'Fatigue',
        'shortness of breath': 'Shortness of breath',
        'chest pain': 'Chest pain',
        'abdominal pain': 'Abdominal pain',
        'joint pain': 'Joint pain',
        'rash': 'Rash',
        'itching': 'Itching',
        'swelling': 'Swelling',
        'bleeding': 'Bleeding',
        'weight loss': 'Weight loss',
        'loss of appetite': 'Loss of appetite'
      },
      am: {
        'headache': 'ራስ ምታት',
        'fever': 'ትኩሳት',
        'cough': 'ሳል',
        'pain': 'ህመም',
        'dizziness': 'ማዞር',
        'nausea': 'ማቅለሽለሽ',
        'vomiting': 'መጨነቅ',
        'diarrhea': 'ምራቅ',
        'fatigue': 'ድካም',
        'shortness of breath': 'አየር መጨነቅ',
        'chest pain': 'ደረት ህመም',
        'abdominal pain': 'ሆድ ህመም',
        'joint pain': 'አንገር ህመም',
        'rash': 'ቁስለት',
        'itching': 'አንፈራ',
        'swelling': 'ማንጠፍ',
        'bleeding': 'ደም መፍሰስ',
        'weight loss': 'ክብደት መቀነስ',
        'loss of appetite': 'መብላት መፍራት'
      }
    },
    bodyParts: {
      en: {
        'head': 'Head',
        'chest': 'Chest',
        'stomach': 'Stomach',
        'arm': 'Arm',
        'leg': 'Leg',
        'back': 'Back',
        'throat': 'Throat',
        'eye': 'Eye',
        'ear': 'Ear',
        'nose': 'Nose'
      },
      am: {
        'head': 'ራስ',
        'chest': 'ደረት',
        'stomach': 'ሆድ',
        'arm': 'እጅ',
        'leg': 'እግር',
        'back': 'ጀርባ',
        'throat': 'ጉሮሮ',
        'eye': 'ዓይን',
        'ear': 'ጆሮ',
        'nose': 'አፍንጫ'
      }
    }
  },

  // Utility Functions
  getHealthcareFacilitiesByCity: function(cityName) {
    return this.healthcareFacilities.filter(facility => 
      facility.city.toLowerCase() === cityName.toLowerCase()
    );
  },

  getDoctorsBySpecialty: function(specialty) {
    return this.doctors.filter(doctor => 
      doctor.specialty.toLowerCase() === specialty.toLowerCase()
    );
  },

  getDoctorsByCityAndSpecialty: function(city, specialty) {
    return this.doctors.filter(doctor => 
      doctor.city.toLowerCase() === city.toLowerCase() &&
      doctor.specialty.toLowerCase() === specialty.toLowerCase()
    );
  },

  getEmergencyContactsByCity: function(cityName) {
    const city = this.cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (!city) return this.emergencyContacts;
    
    return [
      ...this.emergencyContacts,
      {
        service: `${city.name} City Police`,
        number: '+251' + (city.id * 1000000).toString().substring(1),
        description: `Local police for ${city.name}`,
        available: '24/7'
      },
      {
        service: `${city.name} Public Hospital`,
        number: '+251' + (city.id * 1000000 + 1).toString().substring(1),
        description: `Main public hospital in ${city.name}`,
        available: '24/7'
      }
    ];
  },

  getDiseaseInfo: function(diseaseName) {
    return this.commonDiseases.find(disease => 
      disease.name.toLowerCase() === diseaseName.toLowerCase()
    );
  },

  getTraditionalMedicineForSymptom: function(symptom) {
    const symptomLower = symptom.toLowerCase();
    const relevantHerbs = this.traditionalMedicine.commonHerbs.filter(herb => {
      return herb.uses.some(use => use.toLowerCase().includes(symptomLower));
    });
    
    return {
      herbs: relevantHerbs,
      practices: this.traditionalMedicine.practices.filter(practice => 
        practice.toLowerCase().includes(symptomLower)
      )
    };
  },

  getCityHealthStatistics: function(cityName) {
    const city = this.cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (!city) return null;
    
    const facilities = this.getHealthcareFacilitiesByCity(cityName);
    const doctors = this.doctors.filter(d => d.city.toLowerCase() === cityName.toLowerCase());
    
    return {
      city: city.name,
      population: city.population,
      totalHospitals: facilities.filter(f => f.type === 'Tertiary' || f.type === 'Secondary').length,
      totalHealthCenters: facilities.filter(f => f.type === 'Health Center' || f.type === 'Primary').length,
      totalDoctors: doctors.length,
      totalBeds: facilities.reduce((sum, f) => sum + (f.beds || 0), 0),
      doctorPatientRatio: `1:${Math.round(city.population / doctors.length)}`,
      bedPatientRatio: `1:${Math.round(city.population / facilities.reduce((sum, f) => sum + (f.beds || 0), 0))}`,
      specialties: [...new Set(doctors.map(d => d.specialty))]
    };
  },

  searchHealthcare: function(query) {
    const queryLower = query.toLowerCase();
    
    const facilities = this.healthcareFacilities.filter(f => 
      f.name.toLowerCase().includes(queryLower) ||
      f.city.toLowerCase().includes(queryLower) ||
      f.specialty.toLowerCase().includes(queryLower)
    );
    
    const doctors = this.doctors.filter(d => 
      d.name.toLowerCase().includes(queryLower) ||
      d.specialty.toLowerCase().includes(queryLower) ||
      d.city.toLowerCase().includes(queryLower) ||
      d.hospital.toLowerCase().includes(queryLower)
    );
    
    const diseases = this.commonDiseases.filter(d => 
      d.name.toLowerCase().includes(queryLower) ||
      d.symptoms.some(s => s.toLowerCase().includes(queryLower))
    );
    
    return {
      facilities,
      doctors,
      diseases,
      totalResults: facilities.length + doctors.length + diseases.length
    };
  },

  getNearestHealthcare: function(lat, lng, radiusKm = 10) {
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
    
    return this.healthcareFacilities
      .filter(facility => {
        if (!facility.coordinates) return false;
        const distance = calculateDistance(
          lat, lng,
          facility.coordinates.lat,
          facility.coordinates.lng
        );
        return distance <= radiusKm && facility.emergency;
      })
      .sort((a, b) => {
        const distA = calculateDistance(lat, lng, a.coordinates.lat, a.coordinates.lng);
        const distB = calculateDistance(lat, lng, b.coordinates.lat, b.coordinates.lng);
        return distA - distB;
      })
      .slice(0, 10);
  }
};

export default ethiopianMedicalData;