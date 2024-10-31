import { useTranslation } from 'react-i18next';
import { useOrientation } from './hooks/useOrientation';
import useGameInitialization from './hooks/useGameInitialization';
import useGameState from './hooks/useGameState';
import LanguageSwitcher from './components/LanguageSwitcher';
import InfoPopup from './components/InfoPopup';
import PlayerArea from './components/PlayerArea';
import ComputerArea from './components/ComputerArea';
import WinnerMessage from './components/WinnerMessage';
import StartAnimation from './components/StartAnimation';
import MusicButton from './components/MusicButton';
import BackgroundMusic from './components/BackgroundMusic';
import EndAnimation from './components/EndAnimation';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';


import './styles/main.scss';

function App() {
  const { t } = useTranslation();
  const isPortrait = useOrientation();
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Zustand für Musik
  const musicSrc = 'https://walpurga03.github.io/cardBattle/audio/clip.mp3'; // Pfad zur Musikdatei

  const {
    playerCards,
    computerCards,
    setPlayerCards,
    setComputerCards,
  } = useGameInitialization();

  const {
    drawPile,
    currentPlayerCard,
    currentComputerCard,
    winner,
    isComputerTurn,
    gameOver,
    isComputerCardFlipped,
    animationDirection,
    showWinnerMessage,
    lastRoundDetails,
    handlePropertySelect,
    handleComputerTurn,
  } = useGameState(playerCards, computerCards, setPlayerCards, setComputerCards);

  useEffect(() => {
    if (isComputerTurn) {
      document.body.classList.add('computer-turn');
    } else {
      document.body.classList.remove('computer-turn');
    }
  }, [isComputerTurn]);

  if (!isAnimationComplete) {
    return <StartAnimation onAnimationEnd={() => setIsAnimationComplete(true)} />;
  }

  if (isPortrait) {
    return (
      <div className="orientation-warning">
        {t('orientationWarning')}
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="App">
        <EndAnimation playerWon={winner === 'Player'} /> {/* Füge die EndAnimation-Komponente hinzu */}
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar 
        isPlaying={isPlaying} 
        toggleMusic={() => setIsPlaying(!isPlaying)} 
      />

      <BackgroundMusic src={musicSrc} playing={isPlaying} /> {/* Füge die BackgroundMusic-Komponente hinzu */}

      <div className="battlefield">
        <PlayerArea
          playerCards={playerCards}
          currentPlayerCard={currentPlayerCard}
          animationDirection={animationDirection}
          isComputerTurn={isComputerTurn}
          handlePropertySelect={handlePropertySelect}
        />
        <ComputerArea
          computerCards={computerCards}
          currentComputerCard={currentComputerCard}
          isComputerCardFlipped={isComputerCardFlipped}
          animationDirection={animationDirection}
        />
      </div>

      <WinnerMessage
        winner={winner}
        showWinnerMessage={showWinnerMessage}
        selectedProperty={lastRoundDetails.selectedProperty}
        playerValue={lastRoundDetails.playerValue}
        computerValue={lastRoundDetails.computerValue}
      />

      {isComputerTurn && (
        <button onClick={handleComputerTurn} className="button-highlight" style={{ marginTop: '20px' }}>
          {t('computerTurnButton', { computer: t('computer') })}
        </button>
      )}

      {lastRoundDetails.selectedProperty && (
        <div className="last-round-details">
          <h3>{t('lastRound')}</h3>
          <p>
            {lastRoundDetails.selectedProperty && t(`eigenschaften.${lastRoundDetails.selectedProperty}`)}
            <br />
            {t('player')}: {lastRoundDetails.playerValue}
            <br />
            {t('computer')}: {lastRoundDetails.computerValue}
          </p>
        </div>
      )}

      {drawPile.length > 0 && (
        <div className="draw-pile">
          <h3>{t('drawPile', { count: drawPile.length })}</h3>
        </div>
      )}
    </div>
  );
}

export default App;