import React, { useEffect, useRef } from 'react';

interface BackgroundMusicProps {
  src: string;
  playing: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ src, playing }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    console.log('Audio source set to:', src);
    audioRef.current = new Audio(src);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeAttribute('src');
        audioRef.current.load();
      }
    };
  }, [src]);

  useEffect(() => {
    console.log('Playing state changed:', playing);
    if (playing) {
      audioRef.current?.play().catch(e => console.error('Error playing audio:', e));
    } else {
      audioRef.current?.pause();
    }
  }, [playing]);

  return null;
};

export default BackgroundMusic;