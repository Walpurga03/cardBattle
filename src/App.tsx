import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import CardComponent from './components/CardComponent';
import LanguageSwitcher from './components/LanguageSwitcher';
import cardsData from '/home/linux/projects/cardBattle/public/assets/data/cards.json';
import { selectHighestPropertyForComputer } from './utils/selectHighestPropertyForComputer';
import './App.scss';

interface Card {
  id: number; // Beibehalten als number
  name: string; // Fügen Sie den Namen hinzu, um die Übersetzungen zu identifizieren
  image: string;
  eigenschaften: {
    eigenschaft1: number;
    eigenschaft2: number;
    eigenschaft3: number;
    eigenschaft4: number;
    eigenschaft5: number;
  };
}

type PropertyKey = 'eigenschaft1' | 'eigenschaft2' | 'eigenschaft3' | 'eigenschaft4' | 'eigenschaft5';

const propertiesWhereLowerIsBetter: PropertyKey[] = ['eigenschaft1'];

function shuffleArray(array: Card[]): Card[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const { t } = useTranslation();
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [computerCards, setComputerCards] = useState<Card[]>([]);
  const [drawPile, setDrawPile] = useState<Card[]>([]);

  const [currentPlayerCard, setCurrentPlayerCard] = useState<Card | null>(null);
  const [currentComputerCard, setCurrentComputerCard] = useState<Card | null>(null);

  const [winner, setWinner] = useState<string | null>(null);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameInitialized, setGameInitialized] = useState(false);

  const [isComputerCardFlipped, setIsComputerCardFlipped] = useState(true);
  const [animationDirection, setAnimationDirection] = useState<string | null>(null);

  const [showWinnerMessage, setShowWinnerMessage] = useState(false);

  const [lastRoundDetails, setLastRoundDetails] = useState<{
    selectedProperty: PropertyKey | null;
    playerValue: number | null;
    computerValue: number | null;
  }>({
    selectedProperty: null,
    playerValue: null,
    computerValue: null,
  });

  useEffect(() => {
    const shuffledCards = shuffleArray([...cardsData]);
    const middleIndex = Math.floor(shuffledCards.length / 2);

    setPlayerCards(shuffledCards.slice(0, middleIndex));
    setComputerCards(shuffledCards.slice(middleIndex));
    setGameInitialized(true);
  }, []);

  useEffect(() => {
    if (gameInitialized && playerCards.length > 0 && computerCards.length > 0) {
      setCurrentPlayerCard(playerCards[0]);
      setCurrentComputerCard(computerCards[0]);
    }
  }, [playerCards, computerCards, gameInitialized]);

  useEffect(() => {
    if (gameInitialized) {
      if (playerCards.length === 0) {
        setGameOver(true);
        setWinner('Computer');
      } else if (computerCards.length === 0) {
        setGameOver(true);
        setWinner('Player');
      }
    }
  }, [playerCards, computerCards, gameInitialized]);

  useEffect(() => {
    if (winner) {
      setShowWinnerMessage(true);

      const timer = setTimeout(() => {
        setShowWinnerMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [winner]);

  const compareSelectedProperty = (property: PropertyKey) => {
    if (!currentPlayerCard || !currentComputerCard) return;

    setIsComputerCardFlipped(false);
    setIsComputerTurn(false);

    setTimeout(() => {
      const playerValue = currentPlayerCard.eigenschaften[property];
      const computerValue = currentComputerCard.eigenschaften[property];

      setLastRoundDetails({
        selectedProperty: property,
        playerValue,
        computerValue,
      });

      let playerWins: boolean;
      if (propertiesWhereLowerIsBetter.includes(property)) {
        playerWins = playerValue < computerValue;
      } else {
        playerWins = playerValue > computerValue;
      }

      if (playerWins) {
        setWinner('Player');
        setAnimationDirection('left');
        setShowWinnerMessage(true);
        setTimeout(() => {
          setPlayerCards([...playerCards.slice(1), currentPlayerCard, currentComputerCard, ...drawPile]);
          setComputerCards(computerCards.slice(1));
          setDrawPile([]);
          setIsComputerCardFlipped(true);
          setIsComputerTurn(false);
          setAnimationDirection(null);
          setShowWinnerMessage(false);
        }, 5000);
      } else if (!playerWins && playerValue !== computerValue) {
        setWinner('Computer');
        setAnimationDirection('right');
        setShowWinnerMessage(true);
        setTimeout(() => {
          setComputerCards([...computerCards.slice(1), currentComputerCard, currentPlayerCard, ...drawPile]);
          setPlayerCards(playerCards.slice(1));
          setDrawPile([]);
          setIsComputerCardFlipped(true);
          setAnimationDirection(null);
          setIsComputerTurn(true);
          setShowWinnerMessage(false);
        }, 5000);
      } else {
        setWinner('Tie');
        setAnimationDirection('up');
        setShowWinnerMessage(true);
        setTimeout(() => {
          setDrawPile([...drawPile, currentPlayerCard, currentComputerCard]);
          setPlayerCards(playerCards.slice(1));
          setComputerCards(computerCards.slice(1));
          setIsComputerCardFlipped(true);
          setAnimationDirection(null);
          setShowWinnerMessage(false);
        }, 5000);
      }
    }, 5000);
  };

  const handleComputerTurn = () => {
    if (currentComputerCard) {
      const bestProperty = selectHighestPropertyForComputer(currentComputerCard);
      compareSelectedProperty(bestProperty);
    }
  };

  const getAnimation = () => {
    switch (animationDirection) {
      case 'left':
        return { x: '-1000%', opacity: 0 }; // Karte nach links bewegen
      case 'right':
        return { x: '1000%', opacity: 0 }; // Karte nach rechts bewegen
      case 'up':
        return { y: '-1000%', opacity: 0 }; // Karte nach oben bewegen
      default:
        return {};
    }
  };

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
        {/* Spieler-Kartenbereich */}
        <div className="card-container">
          <h2>{t('player')} ({playerCards.length})</h2>
          {currentPlayerCard ? (
            <motion.div
              className="card-spieler"
              initial={{ opacity: 0 }}
              animate={animationDirection ? getAnimation() : { x: 0, opacity: [0, 0, 1] }}
              transition={{
                duration: animationDirection ? 2 : 0.1,
                opacity: { delay: animationDirection ? 2 : 0, duration: 3 }
              }}
            >
              <CardComponent
                cardId={currentPlayerCard.id}
                onSelectProperty={!isComputerTurn ? compareSelectedProperty : undefined}
              />
            </motion.div>
          ) : (
            <p>{t('noMoreCards')}</p>
          )}
        </div>

        {/* Computer-Kartenbereich */}
        <div className="card-container">
          <h2>{t('computer')} ({computerCards.length})</h2>
          {currentComputerCard ? (
            <motion.div
              className="card-computer"
              initial={{ opacity: 0 }}
              animate={animationDirection ? getAnimation() : { x: 0, opacity: [0, 0, 1] }}
              transition={{
                duration: animationDirection ? 2 : 0.1,
                opacity: { delay: animationDirection ? 2 : 0, duration: 3 }
              }}
            >

              <CardComponent
                cardId={currentComputerCard.id}
                isComputer
                isFlipped={isComputerCardFlipped}
              />
            </motion.div>
          ) : (
            <p>{t('noMoreCards')}</p>
          )}
        </div>
      </div>

      {/* Gewinner-Nachricht */}
      {showWinnerMessage && (
        <motion.div
          className="winner-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3>{winner === 'Tie' ? t('tieMessage') : t('winMessage', { winner })}</h3>
        </motion.div>
      )}

      {/* Computer-Zug Button */}
      {isComputerTurn && (
        <button onClick={handleComputerTurn} className="button-highlight" style={{ marginTop: '20px' }}>
          {t('computerTurnButton')}
        </button>
      )}

      {/* Details zur letzten Runde */}
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

      {/* Nachziehstapel */}
      {drawPile.length > 0 && (
        <div className="draw-pile">
          <h3>{t('drawPile', { count: drawPile.length })}</h3>
          <div className="draw-pile-cards">
            {drawPile.map((card, index) => (
              <motion.img
                key={index}
                src={card.image}
                alt={card.name}
                style={{ width: '50px', margin: '5px' }}
                animate={animationDirection === 'up' ? getAnimation() : {}}
                transition={{ duration: 1 }}
              />
            ))}
          </div>
        </div>
      )}
    </div>

  );
}

export default App;
