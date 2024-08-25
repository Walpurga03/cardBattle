// src/App.tsx
import React, { useEffect, useState } from 'react';
import { dealCards } from './features/gameLogic';
import Card from './components/Card';
import { Card as CardType } from './features/cardModel';

function App() {
  const [playerDeck, setPlayerDeck] = useState<CardType[]>([]);
  const [computerDeck, setComputerDeck] = useState<CardType[]>([]);

  useEffect(() => {
    const { playerDeck, computerDeck } = dealCards([
      { name: 'Karte 1', value: 10, image: '/assets/card1.png' },
      { name: 'Karte 2', value: 8, image: '/assets/card2.png' },
      { name: 'Karte 3', value: 15, image: '/assets/card3.png' },
    ]);
    setPlayerDeck(playerDeck);
    setComputerDeck(computerDeck);
  }, []);

  return (
    <div className="App">
      <h1>Kartenspiel</h1>
      <div className="deck player-deck">
        <h2>Spieler-Deck</h2>
        <div className="card-container">
          {playerDeck.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>
      </div>
      <div className="deck computer-deck">
        <h2>Computer-Deck</h2>
        <div className="card-container">
          {computerDeck.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
