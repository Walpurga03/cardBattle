import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import CardComponent from './components/CardComponent';
import LanguageSwitcher from './components/LanguageSwitcher';
import cardsData from './assets/cards.json';
import { selectHighestPropertyForComputer } from './utils/selectHighestPropertyForComputer';
import './App.scss';

interface Card {
  id: string;
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

  const [isComputerCardFlipped, setIsComputerCardFlipped] = useState(true); // Standardmäßig umgedreht
  const [animationDirection, setAnimationDirection] = useState<string | null>(null);

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

  const compareSelectedProperty = (property: PropertyKey) => {
    if (!currentPlayerCard || !currentComputerCard) return;

    // Karte wird zuerst umgedreht, zeigt die Vorderseite für 5 Sekunden, dreht sich dann zurück und startet danach den Vergleich
    setIsComputerCardFlipped(false);
    setIsComputerTurn(false);

    setTimeout(() => {
      // Vergleichslogik ausführen, während die Karte noch sichtbar ist
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
        setTimeout(() => {
          setPlayerCards([...playerCards.slice(1), currentPlayerCard, currentComputerCard, ...drawPile]);
          setComputerCards(computerCards.slice(1));
          setDrawPile([]);
          setIsComputerCardFlipped(true);
          setAnimationDirection(null);
        }, 500);
      } else if (!playerWins && playerValue !== computerValue) {
        setWinner('Computer');
        setAnimationDirection('right');
        setTimeout(() => {
          setComputerCards([...computerCards.slice(1), currentComputerCard, currentPlayerCard, ...drawPile]);
          setPlayerCards(playerCards.slice(1));
          setDrawPile([]);
          setIsComputerCardFlipped(true);
          setAnimationDirection(null);
          setIsComputerTurn(true); // Computer ist wieder an der Reihe
        }, 500);
      } else {
        setWinner('Tie');
        setAnimationDirection('up');
        setTimeout(() => {
          setDrawPile([...drawPile, currentPlayerCard, currentComputerCard]);
          setPlayerCards(playerCards.slice(1));
          setComputerCards(computerCards.slice(1));
          setIsComputerCardFlipped(true);
          setAnimationDirection(null);
        }, 500);
      }

    }, 5000); // 5 Sekunden Wartezeit, bevor der Vergleich ausgeführt wird
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
        return { x: -3000, opacity: 0 };
      case 'right':
        return { x: 3000, opacity: 0 };
      case 'up':
        return { y: -3000, opacity: 0 };
      default:
        return {};
    }
  };

  if (gameOver) {
    return (
      <div className="App">
        <h1>Card Battle</h1>
        <h2>Spiel beendet!</h2>
        <h3>{winner} hat das Spiel gewonnen!</h3>
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="navbar">
        <LanguageSwitcher />
      </nav>

      <div className="battlefield">
        <div className="card-container">
          <h2>Player ({playerCards.length})</h2>
          {currentPlayerCard ? (
            <motion.div
              className="card-spieler"
              initial={{ opacity: 0 }}
              animate={animationDirection ? getAnimation() : { x: 0, opacity: [0, 0, 1] }} // Bewegungs- und Opazitäts-Animation
              transition={{
                duration: 2, // Dauer der gesamten Animation
                opacity: { delay: 1.8, duration: 0.2 } // Opazität wird am Ende der Bewegung geändert
              }}
            >
              <CardComponent
                cardId={currentPlayerCard.id}
                onSelectProperty={!isComputerTurn ? compareSelectedProperty : undefined}
              />
            </motion.div>
          ) : (
            <p>Keine Karten mehr</p>
          )}
        </div>
        <div className="card-container">
          <h2>Computer ({computerCards.length})</h2>
          {currentComputerCard ? (
            <motion.div
              className="card-computer"
              initial={{ opacity: 0 }}
              animate={animationDirection ? getAnimation() : { x: 0, opacity: [0, 0, 1] }} // Bewegungs- und Opazitäts-Animation
              transition={{
                duration: 2, // Dauer der gesamten Animation
                opacity: { delay: 1.8, duration: 0.2 } // Opazität wird am Ende der Bewegung geändert
              }}
            >
              <CardComponent cardId={currentComputerCard.id} isComputer isFlipped={isComputerCardFlipped} />
            </motion.div>
          ) : (
            <p>Keine Karten mehr</p>
          )}
        </div>
      </div>


      {winner && <h3>{winner === 'Tie' ? "It's a tie!" : `${winner} wins this round!`}</h3>}

      {isComputerTurn && (
        <button onClick={handleComputerTurn} style={{ marginTop: '20px' }}>
          Computer ist am Zug - Klicken, um fortzufahren
        </button>
      )}

      {lastRoundDetails.selectedProperty && (
        <div className="last-round-details">
          <h3>Letzte Runde:</h3>
          <p>
            Eigenschaft: {t(`eigenschaften.${lastRoundDetails.selectedProperty}`)} <br />
            Spieler: {lastRoundDetails.playerValue} <br />
            Computer: {lastRoundDetails.computerValue}
          </p>
        </div>
      )}

      {drawPile.length > 0 && (
        <div className="draw-pile">
          <h3>Draw Pile: {drawPile.length} Karten</h3>
          <div className="draw-pile-cards">
            {drawPile.map((card, index) => (
              <motion.img
                key={index}
                src={card.image}
                alt={card.id}
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
