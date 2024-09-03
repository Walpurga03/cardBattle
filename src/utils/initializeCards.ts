import { Card } from '../types/Card';
import cardsData from '../../public/assets/data/cards.json';
import { shuffleArray } from './shuffleArray';

export const initializeCards = (): { playerCards: Card[]; computerCards: Card[] } => {
  const shuffledCards = shuffleArray([...cardsData]);
  const middleIndex = Math.floor(shuffledCards.length / 2);

  const playerCards = shuffledCards.slice(0, middleIndex);
  const computerCards = shuffledCards.slice(middleIndex);

  return { playerCards, computerCards };
};
