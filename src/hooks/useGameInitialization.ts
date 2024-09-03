import { useState, useEffect } from 'react';
import { Card } from '../types/Card';
import { initializeCards } from '../utils/initializeCards';

const useGameInitialization = () => {
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [computerCards, setComputerCards] = useState<Card[]>([]);
  const [gameInitialized, setGameInitialized] = useState(false);

  useEffect(() => {
    const { playerCards, computerCards } = initializeCards();

    setPlayerCards(playerCards);
    setComputerCards(computerCards);
    setGameInitialized(true);
  }, []);

  return {
    playerCards,
    computerCards,
    gameInitialized,
    setPlayerCards,
    setComputerCards,
    setGameInitialized,
  };
};

export default useGameInitialization;
