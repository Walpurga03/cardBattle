import React from 'react';
import { motion } from 'framer-motion';
import { Card, PropertyKey } from '../types/Card';
import CardComponent from './CardComponent';
import { getAnimation } from '../utils/animations';
import { useTranslation } from 'react-i18next';

interface PlayerAreaProps {
  playerCards: Card[];
  currentPlayerCard: Card | null;
  animationDirection: string | null;
  isComputerTurn: boolean;
  handlePropertySelect: (property: PropertyKey) => void;
}

const PlayerArea: React.FC<PlayerAreaProps> = ({
  playerCards,
  currentPlayerCard,
  animationDirection,
  isComputerTurn,
  handlePropertySelect,
}) => {
  const { t } = useTranslation();

  return (
    <div className="card-container">
      <h2>{t('player')} ({playerCards.length})</h2>
      {currentPlayerCard ? (
        <motion.div
          className="card-spieler"
          initial={{ opacity: 0 }}
          animate={animationDirection ? getAnimation(animationDirection) : { x: 0, opacity: [0, 0, 1] }}
          transition={{
            duration: animationDirection ? 2 : 0.1,
            opacity: { delay: animationDirection ? 2 : 0, duration: 3 }
          }}
        >
          <CardComponent
            cardId={currentPlayerCard.id}
            onSelectProperty={!isComputerTurn ? handlePropertySelect : undefined}
            className="player-card" // Füge die Klasse hier hinzu
          />
        </motion.div>
      ) : (
        <p>{t('noMoreCards')}</p>
      )}
    </div>
  );
};

export default PlayerArea;