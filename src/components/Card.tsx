// src/components/Card.tsx
import './Card.css';
import React from 'react';
import { Card as CardType } from '../features/cardModel'; // Importiere den Kartentyp

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="card">
      <img src={card.image} alt={card.name} className="card-image" />
      <div className="card-details">
        <h3>{card.name}</h3>
        <p>Wert: {card.value}</p>
      </div>
    </div>
  );
};

export default Card;
