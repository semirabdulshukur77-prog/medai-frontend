// src/components/VideoCall.jsx
import React, { useRef, useState } from 'react';
import { 
  FaVideo, FaVideoSlash, FaMicrophone,
  FaMicrophoneSlash, FaPhone, FaUserMd
} from 'react-icons/fa';

const VideoCall = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const videoRef = useRef(null);
  
  return (
    <div className="video-call">
      <h1>Video Consultation</h1>
      {/* Video call interface */}
    </div>
  );
};
export default VideoCall;