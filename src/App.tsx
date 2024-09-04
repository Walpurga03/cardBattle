import { useTranslation } from 'react-i18next';
import { useOrientation } from './hooks/useOrientation';
import useGameInitialization from './hooks/useGameInitialization';
import useGameState from './hooks/useGameState';
import LanguageSwitcher from './components/LanguageSwitcher';
import PlayerArea from './components/PlayerArea';
import ComputerArea from './components/ComputerArea';
import WinnerMessage from './components/WinnerMessage';
import './styles/main.scss';

function App() {
  const { t } = useTranslation();
  const isPortrait = useOrientation();
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
        <h1>{t('title')}</h1>
        <h2>{t('gameOver')}</h2>
        <h3>{t('playerWins', { winner })}</h3>
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="navbar">
        <LanguageSwitcher />
      </nav>

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
      />

      {isComputerTurn && (
        <button onClick={handleComputerTurn} className="button-highlight" style={{ marginTop: '20px' }}>
          {t('computerTurnButton')}
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
