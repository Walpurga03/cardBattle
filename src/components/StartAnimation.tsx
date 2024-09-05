import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import anime from 'animejs/lib/anime.es.js';
import '../styles/main.scss';

const StartAnimation = ({ onAnimationEnd }: { onAnimationEnd: () => void }) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    anime.timeline({
      complete: () => {
        setIsAnimationComplete(true);
        if (onAnimationEnd) onAnimationEnd();
      }
    })
      .add({
        targets: '.text span',
        translateX: [1000, 0],
        scale: [1, 1],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 2500,
        delay: anime.stagger(100),
      })
      .add({
        targets: '.text span',
        translateX: [0, 500],
        scale: [1, 50],
        opacity: [1, 0],
        easing: "easeOutExpo",
        duration: 1500,
        delay: anime.stagger(100),
      });
  }, [onAnimationEnd]);

  const characters = t('title').split("").map((char, index) => (
    <span key={index} style={{ display: 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char} {/* Ersetzt Leerzeichen durch ein geschütztes Leerzeichen */}
    </span>
  ));

  return (
    <div className="welcome-animation" style={{ display: isAnimationComplete ? 'none' : 'block' }}>
      <section>
        <h2 className='text'>{characters}</h2>
      </section>
    </div>
  );
};

export default StartAnimation;