import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CardComponent from './components/CardComponent';
import LanguageSwitcher from './components/LanguageSwitcher';
import cardsData from './assets/cards.json';
import { selectHighestPropertyForComputer } from './utils/selectHighestPropertyForComputer';

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

// Eigenschaften, bei denen niedrigere Werte besser sind (z.B. "Seit")
const propertiesWhereLowerIsBetter: PropertyKey[] = ['eigenschaft1'];

function shuffleArray(array: Card[]): Card[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const { t } = useTranslation(); // i18n-Hook zum Übersetzen
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [computerCards, setComputerCards] = useState<Card[]>([]);
  const [drawPile, setDrawPile] = useState<Card[]>([]);

  const [currentPlayerCard, setCurrentPlayerCard] = useState<Card | null>(null);
  const [currentComputerCard, setCurrentComputerCard] = useState<Card | null>(null);

  const [winner, setWinner] = useState<string | null>(null);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameInitialized, setGameInitialized] = useState(false);

  // Zustand für die Details der letzten Runde
  const [lastRoundDetails, setLastRoundDetails] = useState<{
    selectedProperty: PropertyKey | null;
    playerValue: number | null;
    computerValue: number | null;
  }>({
    selectedProperty: null,
    playerValue: null,
    computerValue: null,
  });

  // Initialisiere das Spiel und verteile die Karten
  useEffect(() => {
    const shuffledCards = shuffleArray([...cardsData]);
    const middleIndex = Math.floor(shuffledCards.length / 2);

    setPlayerCards(shuffledCards.slice(0, middleIndex));
    setComputerCards(shuffledCards.slice(middleIndex));
    setGameInitialized(true);
  }, []);

  // Setze die aktuellen Karten für Spieler und Computer, nachdem die Karten aufgeteilt wurden
  useEffect(() => {
    if (gameInitialized && playerCards.length > 0 && computerCards.length > 0) {
      setCurrentPlayerCard(playerCards[0]);
      setCurrentComputerCard(computerCards[0]);
    }
  }, [playerCards, computerCards, gameInitialized]);

  // Überprüfe, ob das Spiel vorbei ist
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

    const playerValue = currentPlayerCard.eigenschaften[property];
    const computerValue = currentComputerCard.eigenschaften[property];

    // Speichere die Details der letzten Runde
    setLastRoundDetails({
      selectedProperty: property,
      playerValue,
      computerValue,
    });

    // Vergleichslogik: Höherer Wert oder niedrigerer Wert gewinnt, je nach Eigenschaft
    let playerWins: boolean;
    if (propertiesWhereLowerIsBetter.includes(property)) {
      playerWins = playerValue < computerValue; // Niedrigerer Wert gewinnt
    } else {
      playerWins = playerValue > computerValue; // Höherer Wert gewinnt
    }

    if (playerWins) {
      setWinner('Player');
      setPlayerCards([...playerCards.slice(1), currentPlayerCard, currentComputerCard, ...drawPile]);
      setComputerCards(computerCards.slice(1));
      setDrawPile([]);
      setIsComputerTurn(false);
    } else if (!playerWins && playerValue !== computerValue) {
      setWinner('Computer');
      setIsComputerTurn(true);
      setComputerCards([...computerCards.slice(1), currentComputerCard, currentPlayerCard, ...drawPile]);
      setPlayerCards(playerCards.slice(1));
      setDrawPile([]);
    } else {
      setWinner('Tie');
      setDrawPile([...drawPile, currentPlayerCard, currentComputerCard]);
      setPlayerCards(playerCards.slice(1));
      setComputerCards(computerCards.slice(1));
      setIsComputerTurn(false);
    }
  };

  const handleComputerTurn = () => {
    if (currentComputerCard) {
      const bestProperty = selectHighestPropertyForComputer(currentComputerCard);
      compareSelectedProperty(bestProperty);
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
      <h1>Card Battle</h1>
      <LanguageSwitcher />

      <div className="battlefield">
        <div>
          <h2>Player's Card (Karten: {playerCards.length})</h2>
          {currentPlayerCard ? (
            <CardComponent
              cardId={currentPlayerCard.id}
              onSelectProperty={!isComputerTurn ? compareSelectedProperty : undefined}
            />
          ) : (
            <p>Keine Karten mehr</p>
          )}
        </div>
        <div>
          <h2>Computer's Card (Karten: {computerCards.length})</h2>
          {currentComputerCard ? (
            <CardComponent cardId={currentComputerCard.id} isComputer />
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
            Ausgewählte Eigenschaft: {t(`eigenschaften.${lastRoundDetails.selectedProperty}`)} <br />
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
              <img key={index} src={card.image} alt={card.id} style={{ width: '50px', margin: '5px' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
