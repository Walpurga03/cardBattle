// src/features/gameLogic.test.ts
import { dealCards } from './gameLogic';

describe('gameLogic', () => {
  it('should shuffle and deal the cards evenly', () => {
    const deck = [
      { name: 'Karte 1', value: 10, image: '/assets/card1.png' },
      { name: 'Karte 2', value: 8, image: '/assets/card2.png' },
      { name: 'Karte 3', value: 15, image: '/assets/card3.png' },
    ];

    const { playerDeck, computerDeck } = dealCards(deck);

    expect(playerDeck.length).toBe(1); // Spieler bekommt 1 Karte
    expect(computerDeck.length).toBe(2); // Computer bekommt 2 Karten
  });
});
