// utils/compareCards.ts

import { Card, PropertyKey } from '../App';

interface CompareResult {
  winner: 'Player' | 'Computer' | 'Tie';
  playerValue: number;
  computerValue: number;
  updatedPlayerCards: Card[];
  updatedComputerCards: Card[];
  updatedDrawPile: Card[];
}

export function compareCards(
  property: PropertyKey,
  currentPlayerCard: Card,
  currentComputerCard: Card,
  playerCards: Card[],
  computerCards: Card[],
  drawPile: Card[],
  propertiesWhereLowerIsBetter: PropertyKey[]
): CompareResult {
  const playerValue = currentPlayerCard.eigenschaften[property];
  const computerValue = currentComputerCard.eigenschaften[property];

  let playerWins: boolean;
  if (propertiesWhereLowerIsBetter.includes(property)) {
    playerWins = playerValue < computerValue;
  } else {
    playerWins = playerValue > computerValue;
  }

  let winner: 'Player' | 'Computer' | 'Tie';
  let updatedPlayerCards = [...playerCards];
  let updatedComputerCards = [...computerCards];
  let updatedDrawPile = [...drawPile];

  if (playerWins) {
    winner = 'Player';
    updatedPlayerCards = [...playerCards.slice(1), currentPlayerCard, currentComputerCard, ...drawPile];
    updatedComputerCards = computerCards.slice(1);
    updatedDrawPile = [];
  } else if (!playerWins && playerValue !== computerValue) {
    winner = 'Computer';
    updatedComputerCards = [...computerCards.slice(1), currentComputerCard, currentPlayerCard, ...drawPile];
    updatedPlayerCards = playerCards.slice(1);
    updatedDrawPile = [];
  } else {
    winner = 'Tie';
    updatedDrawPile = [...drawPile, currentPlayerCard, currentComputerCard];
    updatedPlayerCards = playerCards.slice(1);
    updatedComputerCards = computerCards.slice(1);
  }

  return {
    winner,
    playerValue,
    computerValue,
    updatedPlayerCards,
    updatedComputerCards,
    updatedDrawPile,
  };
}
