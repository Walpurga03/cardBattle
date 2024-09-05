import React from 'react';

interface MusicButtonProps {
  isPlaying: boolean;
  toggleMusic: () => void;
}

const MusicButton: React.FC<MusicButtonProps> = ({ isPlaying, toggleMusic }) => {
  return (
    <button onClick={toggleMusic} className="music-button">
      {isPlaying ? 'Pause Music' : 'Play Music'}
    </button>
  );
};

export default MusicButton;