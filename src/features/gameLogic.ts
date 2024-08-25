// src/features/gameLogic.ts
import { Card, cardDeck } from './cardModel';

// Funktion zum Mischen des Decks
export function shuffleDeck(deck: Card[]): Card[] {
  return deck.sort(() => Math.random() - 0.5);
}

// Funktion zum Verteilen der Karten zwischen zwei Spielern
export function dealCards(deck: Card[]): { playerDeck: Card[]; computerDeck: Card[] } {
  const shuffledDeck = shuffleDeck(deck);
  const mid = Math.floor(shuffledDeck.length / 2);
  return {
    playerDeck: shuffledDeck.slice(0, mid),
    computerDeck: shuffledDeck.slice(mid),
  };
}

// Beispiel für die Nutzung:
const { playerDeck, computerDeck } = dealCards(cardDeck);
console.log('Spieler-Deck:', playerDeck);
console.log('Computer-Deck:', computerDeck);
