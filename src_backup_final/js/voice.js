// src/js/voice.js
let recognition = null;
let isListening = false;
let currentLanguage = 'en-US';

export function initVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.warn('Speech recognition not supported');
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = currentLanguage;

  recognition.onstart = () => {
    isListening = true;
    console.log('Voice recognition started');
    dispatchVoiceEvent('start');
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    dispatchVoiceEvent('result', {
      interim: interimTranscript,
      final: finalTranscript,
      raw: event
    });
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    isListening = false;
    dispatchVoiceEvent('error', event.error);
  };

  recognition.onend = () => {
    isListening = false;
    console.log('Voice recognition ended');
    dispatchVoiceEvent('end');
  };
}

export function startListening(language = null) {
  if (!recognition) {
    throw new Error('Voice recognition not initialized');
  }

  if (language) {
    setLanguage(language);
  }

  if (!isListening) {
    try {
      recognition.start();
    } catch (error) {
      console.error('Failed to start recognition:', error);
      throw error;
    }
  }
}

export function stopListening() {
  if (recognition && isListening) {
    recognition.stop();
  }
}

export function setLanguage(language) {
  if (!recognition) return;
  
  const langMap = {
    'en': 'en-US',
    'am': 'am-ET',
    'en-US': 'en-US',
    'am-ET': 'am-ET'
  };

  const langCode = langMap[language] || 'en-US';
  
  if (langCode !== currentLanguage) {
    currentLanguage = langCode;
    recognition.lang = langCode;
  }
}

export function isVoiceSupported() {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function isListeningNow() {
  return isListening;
}

export function getCurrentLanguage() {
  return currentLanguage;
}

// Text-to-speech functions
export function speak(text, options = {}) {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set options
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    utterance.lang = options.lang || currentLanguage;
    
    utterance.onend = () => {
      resolve();
    };
    
    utterance.onerror = (event) => {
      reject(event.error);
    };

    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function getAvailableVoices() {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis.getVoices();
  }
  return [];
}

// Event dispatching for React integration
const voiceEventHandlers = new Map();

export function addVoiceEventListener(event, handler) {
  if (!voiceEventHandlers.has(event)) {
    voiceEventHandlers.set(event, new Set());
  }
  voiceEventHandlers.get(event).add(handler);
}

export function removeVoiceEventListener(event, handler) {
  if (voiceEventHandlers.has(event)) {
    voiceEventHandlers.get(event).delete(handler);
  }
}

function dispatchVoiceEvent(event, data = null) {
  if (voiceEventHandlers.has(event)) {
    voiceEventHandlers.get(event).forEach(handler => {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in voice event handler for ${event}:`, error);
      }
    });
  }
}

// Voice command processing
const voiceCommands = new Map();

export function registerVoiceCommand(pattern, handler) {
  voiceCommands.set(pattern, handler);
}

export function processVoiceCommand(transcript) {
  const lowerTranscript = transcript.toLowerCase();
  
  for (const [pattern, handler] of voiceCommands) {
    if (typeof pattern === 'string') {
      if (lowerTranscript.includes(pattern.toLowerCase())) {
        handler(transcript);
        return true;
      }
    } else if (pattern instanceof RegExp) {
      if (pattern.test(transcript)) {
        handler(transcript);
        return true;
      }
    }
  }
  
  return false;
}

// Predefined voice commands for medical context
registerVoiceCommand(/analyze symptoms/i, (transcript) => {
  console.log('Analyzing symptoms from voice command');
  // Trigger symptom analysis
  document.getElementById('analyzeBtn')?.click();
});

registerVoiceCommand(/find doctor/i, (transcript) => {
  console.log('Finding doctor from voice command');
  // Trigger doctor search
  document.getElementById('findDoctorsBtn')?.click();
});

registerVoiceCommand(/emergency/i, (transcript) => {
  console.log('Emergency voice command detected');
  // Trigger emergency protocol
  window.location.href = 'tel:911';
});

export default {
  initVoiceRecognition,
  startListening,
  stopListening,
  setLanguage,
  isVoiceSupported,
  isListeningNow,
  getCurrentLanguage,
  speak,
  stopSpeaking,
  getAvailableVoices,
  addVoiceEventListener,
  removeVoiceEventListener,
  registerVoiceCommand,
  processVoiceCommand
};