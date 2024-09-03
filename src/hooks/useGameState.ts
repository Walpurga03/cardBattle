import { useState, useEffect } from 'react';
import { Card, PropertyKey } from '../types/Card';
import { compareCards } from '../utils/compareCards';
import { selectHighestPropertyForComputer } from '../utils/selectHighestPropertyForComputer';

const propertiesWhereLowerIsBetter: PropertyKey[] = ['eigenschaft1'];

const useGameState = (
  playerCards: Card[],
  computerCards: Card[],
  setPlayerCards: React.Dispatch<React.SetStateAction<Card[]>>,
  setComputerCards: React.Dispatch<React.SetStateAction<Card[]>>
) => {
  const [drawPile, setDrawPile] = useState<Card[]>([]);
  const [currentPlayerCard, setCurrentPlayerCard] = useState<Card | null>(null);
  const [currentComputerCard, setCurrentComputerCard] = useState<Card | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
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
    if (playerCards.length > 0 && computerCards.length > 0) {
      setCurrentPlayerCard(playerCards[0]);
      setCurrentComputerCard(computerCards[0]);
    }
  }, [playerCards, computerCards]);

  useEffect(() => {
    // Überprüfe das Spielende nur, wenn das Spiel initialisiert ist und es mindestens eine Karte gibt
    if ((playerCards.length > 0 || computerCards.length > 0) && !gameOver) {
      if (playerCards.length === 0) {
        setGameOver(true);
        setWinner('Computer');
      } else if (computerCards.length === 0) {
        setGameOver(true);
        setWinner('Player');
      }
    }
  }, [playerCards, computerCards, gameOver]); // Überprüfe auch gameOver, um sicherzustellen, dass der Hook nicht erneut ausgeführt wird

  useEffect(() => {
    if (winner) {
      setShowWinnerMessage(true);

      const timer = setTimeout(() => {
        setShowWinnerMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [winner]);

  const handlePropertySelect = (property: PropertyKey) => {
    if (!currentPlayerCard || !currentComputerCard) return;

    setIsComputerCardFlipped(false);
    setIsComputerTurn(false);

    setTimeout(() => {
      const result = compareCards(
        property,
        currentPlayerCard,
        currentComputerCard,
        playerCards,
        computerCards,
        drawPile,
        propertiesWhereLowerIsBetter
      );

      setLastRoundDetails({
        selectedProperty: property,
        playerValue: result.playerValue,
        computerValue: result.computerValue,
      });

      if (result.winner === 'Player') {
        setWinner('Player');
        setAnimationDirection('left');
        setShowWinnerMessage(true);
        setTimeout(() => {
          setPlayerCards(result.updatedPlayerCards);
          setComputerCards(result.updatedComputerCards);
          setDrawPile(result.updatedDrawPile);
          setIsComputerCardFlipped(true);
          setIsComputerTurn(false);
          setAnimationDirection(null);
          setShowWinnerMessage(false);
        }, 5000);
      } else if (result.winner === 'Computer') {
        setWinner('Computer');
        setAnimationDirection('right');
        setShowWinnerMessage(true);
        setTimeout(() => {
          setComputerCards(result.updatedComputerCards);
          setPlayerCards(result.updatedPlayerCards);
          setDrawPile(result.updatedDrawPile);
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
          setDrawPile(result.updatedDrawPile);
          setPlayerCards(result.updatedPlayerCards);
          setComputerCards(result.updatedComputerCards);
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
      handlePropertySelect(bestProperty);
    }
  };

  return {
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
  };
};

export default useGameState;
