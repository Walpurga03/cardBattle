import { Card, PropertyKey } from '../types/Card';

interface CompareResult {
  winner: string;
  playerValue: number;
  computerValue: number;
  updatedPlayerCards: Card[];
  updatedComputerCards: Card[];
  updatedDrawPile: Card[];
}

// Logik zum Vergleich der Karten basierend auf den ausgewählten Eigenschaften
export const compareCards = (
  property: PropertyKey,
  playerCard: Card,
  computerCard: Card,
  playerCards: Card[],
  computerCards: Card[],
  drawPile: Card[],
  propertiesWhereLowerIsBetter: PropertyKey[]
): CompareResult => {
  const playerValue = playerCard.eigenschaften[property];
  const computerValue = computerCard.eigenschaften[property];

  let winner = 'Tie'; // Standardmäßig Unentschieden

  if (
    (propertiesWhereLowerIsBetter.includes(property) && playerValue < computerValue) ||
    (!propertiesWhereLowerIsBetter.includes(property) && playerValue > computerValue)
  ) {
    winner = 'Player';
  } else if (
    (propertiesWhereLowerIsBetter.includes(property) && playerValue > computerValue) ||
    (!propertiesWhereLowerIsBetter.includes(property) && playerValue < computerValue)
  ) {
    winner = 'Computer';
  }

  // Aktualisierte Kartenstapel nach der Runde
  let updatedPlayerCards = [...playerCards];
  let updatedComputerCards = [...computerCards];
  let updatedDrawPile = [...drawPile, playerCard, computerCard];

  if (winner === 'Player') {
    updatedPlayerCards = [...playerCards.slice(1), computerCard];
    updatedComputerCards = computerCards.slice(1);
  } else if (winner === 'Computer') {
    updatedComputerCards = [...computerCards.slice(1), playerCard];
    updatedPlayerCards = playerCards.slice(1);
  } else {
    // Bei Unentschieden verbleiben die Karten im DrawPile
    updatedDrawPile = [...drawPile, playerCard, computerCard];
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
};
