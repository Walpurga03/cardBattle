// src/features/cardModel.ts

export interface Card {
  name: string;
  value: number;
  image: string; // Pfad zum Bild der Karte
}

// Beispiel: Ein Kartendeck könnte aus diesen Karten bestehen
export const cardDeck: Card[] = [
  { name: 'Karte 1', value: 10, image: '/assets/card1.png' },
  { name: 'Karte 2', value: 8, image: '/assets/card2.png' },
  { name: 'Karte 3', value: 15, image: '/assets/card3.png' },
  // Weitere Karten
];