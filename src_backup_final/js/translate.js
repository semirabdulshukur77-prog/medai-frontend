// src/js/translate.js
class TranslationService {
  constructor() {
    this.currentLanguage = localStorage.getItem('medai_language') || 'en';
    this.translations = {};
    this.ethiopicTranslations = {};
    
    this.loadTranslations();
    this.initEthiopicSupport();
  }

  async loadTranslations() {
    try {
      // Load translation files
      const response = await fetch('/translations/medical.json');
      this.translations = await response.json();
    } catch (error) {
      console.warn('Failed to load translations, using fallback:', error);
      this.loadFallbackTranslations();
    }
  }

  loadFallbackTranslations() {
    this.translations = {
      en: {
        // Medical terms
        'symptoms': 'Symptoms',
        'diagnosis': 'Diagnosis',
        'prescription': 'Prescription',
        'appointment': 'Appointment',
        'emergency': 'Emergency',
        
        // UI text
        'welcome': 'Welcome to MedAI',
        'analyze_symptoms': 'Analyze Symptoms',
        'find_doctor': 'Find Doctor',
        'medical_history': 'Medical History',
        'privacy_notice': 'Your data is secure and encrypted',
        
        // Common phrases
        'please_describe': 'Please describe your symptoms in detail',
        'loading': 'Loading...',
        'success': 'Success',
        'error': 'Error',
        'warning': 'Warning'
      },
      am: {
        // Medical terms
        'symptoms': 'ምልክቶች',
        'diagnosis': 'ህክምና',
        'prescription': 'መድሃኒት አዘውትር',
        'appointment': 'ቀጠሮ',
        'emergency': 'አደጋ',
        
        // UI text
        'welcome': 'ወደ ሜድኤይ እንኳን በደህና መጡ',
        'analyze_symptoms': 'ምልክቶችን ይተንትኑ',
        'find_doctor': 'ዶክተር ያግኙ',
        'medical_history': 'የጤና ታሪክ',
        'privacy_notice': 'ውሂብዎ ደህንነቱ የተጠበቀ እና ተመስገን ነው',
        
        // Common phrases
        'please_describe': 'እባክዎ ምልክቶችዎን በዝርዝር ይግለጹ',
        'loading': 'በመጫን ላይ...',
        'success': 'ተሳክቷል',
        'error': 'ስህተት',
        'warning': 'ማስጠንቀቂያ'
      }
    };
  }

  initEthiopicSupport() {
    // Ethiopian-specific translations and formatting
    this.ethiopicTranslations = {
      regions: {
        'addis ababa': 'አዲስ አበባ',
        'amhara': 'አማራ',
        'oromia': 'ኦሮሚያ',
        'snnpr': 'ደቡብ',
        'tigray': 'ትግራይ'
      },
      hospitals: {
        'black lion': 'አንበሳ ጥቁር',
        'st. paul\'s': 'ቅዱስ ጳውሎስ',
        'tikur anbessa': 'ጥቁር አንበሳ',
        'myungsung': 'ሚውንግሱንግ'
      },
      specialties: {
        'cardiologist': 'ልብ ሐኪም',
        'neurologist': 'ነርቭ ሐኪም',
        'pediatrician': 'የሕፃናት ሐኪም',
        'orthopedic': 'የአጥንት ሐኪም'
      }
    };
  }

  translate(key, language = null) {
    const lang = language || this.currentLanguage;
    
    // Try to get translation
    if (this.translations[lang] && this.translations[lang][key]) {
      return this.translations[lang][key];
    }
    
    // Fallback to English
    if (lang !== 'en' && this.translations.en && this.translations.en[key]) {
      return this.translations.en[key];
    }
    
    // Return key if no translation found
    return key;
  }

  translateEthiopic(text, category = null) {
    if (category && this.ethiopicTranslations[category]) {
      const lowerText = text.toLowerCase();
      for (const [english, amharic] of Object.entries(this.ethiopicTranslations[category])) {
        if (lowerText.includes(english)) {
          return text.replace(new RegExp(english, 'gi'), amharic);
        }
      }
    }
    return text;
  }

  setLanguage(lang) {
    if (['en', 'am'].includes(lang)) {
      this.currentLanguage = lang;
      localStorage.setItem('medai_language', lang);
      
      // Update HTML lang attribute
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'am' ? 'rtl' : 'ltr';
      
      // Dispatch language change event
      this.dispatchLanguageChange();
      
      return true;
    }
    return false;
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getDirection() {
    return this.currentLanguage === 'am' ? 'rtl' : 'ltr';
  }

  formatDate(date, format = 'medium') {
    const d = new Date(date);
    
    if (this.currentLanguage === 'am') {
      // Ethiopian date formatting
      const ethiopianDate = this.toEthiopianDate(d);
      
      if (format === 'short') {
        return `${ethiopianDate.day}/${ethiopianDate.month}/${ethiopianDate.year}`;
      } else {
        const months = [
          'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 
          'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 
          'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'
        ];
        
        return `${ethiopianDate.day} ${months[ethiopianDate.month - 1]} ${ethiopianDate.year}`;
      }
    } else {
      // Gregorian date formatting
      if (format === 'short') {
        return d.toLocaleDateString('en-US');
      } else {
        return d.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }
  }

  toEthiopianDate(gregorianDate) {
    // Convert Gregorian date to Ethiopian date
    // This is a simplified conversion
    const year = gregorianDate.getFullYear();
    const month = gregorianDate.getMonth();
    const day = gregorianDate.getDate();
    
    // Approximate conversion (for demonstration)
    let ethYear = year - 8;
    if (month < 8 || (month === 8 && day < 11)) {
      ethYear--;
    }
    
    return {
      year: ethYear,
      month: ((month + 4) % 12) + 1,
      day: day
    };
  }

  formatNumber(number) {
    if (this.currentLanguage === 'am') {
      // Ethiopian number formatting (Ge'ez numerals)
      const geezNumerals = ['፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱', '፲'];
      
      if (number <= 10) {
        return geezNumerals[number - 1] || number.toString();
      }
    }
    
    return number.toLocaleString(this.currentLanguage === 'am' ? 'am-ET' : 'en-US');
  }

  formatCurrency(amount, currency = 'ETB') {
    if (this.currentLanguage === 'am') {
      return `${this.formatNumber(amount)} ብር`;
    } else {
      return `${currency} ${amount.toLocaleString('en-US')}`;
    }
  }

  dispatchLanguageChange() {
    const event = new CustomEvent('languageChange', {
      detail: { language: this.currentLanguage }
    });
    window.dispatchEvent(event);
  }

  // Auto-translate elements with data attributes
  autoTranslate() {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      const translation = this.translate(key);
      
      if (translation !== key) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
    
    // Translate elements with data attributes for specific languages
    const langElements = document.querySelectorAll('[data-lang]');
    langElements.forEach(element => {
      const langKey = element.getAttribute('data-lang');
      if (langKey === this.currentLanguage) {
        element.style.display = '';
      } else {
        element.style.display = 'none';
      }
    });
  }
}

// Create singleton instance
const translationService = new TranslationService();

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  translationService.autoTranslate();
});

// Re-translate when language changes
window.addEventListener('languageChange', () => {
  translationService.autoTranslate();
});

export function initTranslation() {
  return translationService;
}

export function t(key, language = null) {
  return translationService.translate(key, language);
}

export function setLanguage(lang) {
  return translationService.setLanguage(lang);
}

export function getCurrentLanguage() {
  return translationService.getCurrentLanguage();
}

export function formatDate(date, format = 'medium') {
  return translationService.formatDate(date, format);
}

export function formatNumber(number) {
  return translationService.formatNumber(number);
}

export function formatCurrency(amount, currency = 'ETB') {
  return translationService.formatCurrency(amount, currency);
}

export default translationService;