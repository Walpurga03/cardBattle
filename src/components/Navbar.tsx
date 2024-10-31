import React, { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import InfoPopup from './InfoPopup';
import MusicButton from './MusicButton';

interface NavbarProps {
  isPlaying: boolean;
  toggleMusic: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isPlaying, toggleMusic }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  };

  return (
    <>
      <nav className={`navbar ${isMobile ? 'mobile' : ''} ${isExpanded ? 'expanded' : ''}`}>
        {isMobile && (
          <button 
            className="navbar-toggle"
            onClick={toggleNavbar}
            aria-label="Toggle navigation"
          >
            {isExpanded ? '✕' : '☰'}
          </button>
        )}
        <div className="navbar-left">
          <LanguageSwitcher className="navbar-button" />
          <MusicButton 
            className="navbar-button" 
            isPlaying={isPlaying} 
            toggleMusic={toggleMusic} 
          />
          {/* Info Button in die linke Gruppe verschoben */}
          <InfoPopup className="navbar-button" />
        </div>
        {/* Rechte Gruppe entfernt, da alle Buttons jetzt in der linken Gruppe sind */}
      </nav>
      <div 
        className="navbar-overlay" 
        onClick={() => isExpanded && toggleNavbar()}
        aria-hidden="true"
      />
    </>
  );
};

export default Navbar;