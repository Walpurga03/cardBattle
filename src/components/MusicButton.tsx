import React from 'react';

interface MusicButtonProps {
  isPlaying: boolean;
  toggleMusic: () => void;
  className?: string;
}

const MusicButton: React.FC<MusicButtonProps> = ({ isPlaying, toggleMusic, className }) => {
  return (
    <button className={className} onClick={toggleMusic}>
      {isPlaying ? 'Pause Music' : 'Play Music'}
    </button>
  );
};

export default MusicButton;