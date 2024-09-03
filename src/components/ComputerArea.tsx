import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../types/Card';
import CardComponent from './CardComponent';
import { getAnimation } from '../utils/animations';
import { useTranslation } from 'react-i18next';

interface ComputerAreaProps {
  computerCards: Card[];
  currentComputerCard: Card | null;
  isComputerCardFlipped: boolean;
  animationDirection: string | null;
}

const ComputerArea: React.FC<ComputerAreaProps> = ({
  computerCards,
  currentComputerCard,
  isComputerCardFlipped,
  animationDirection,
}) => {
  const { t } = useTranslation();

  return (
    <div className="card-container">
      <h2>{t('computer')} ({computerCards.length})</h2>
      {currentComputerCard ? (
        <motion.div
          className="card-computer"
          initial={{ opacity: 0 }}
          animate={animationDirection ? getAnimation(animationDirection) : { x: 0, opacity: [0, 0, 1] }}
          transition={{
            duration: animationDirection ? 2 : 0.1,
            opacity: { delay: animationDirection ? 2 : 0, duration: 3 }
          }}
        >
          <CardComponent
            cardId={currentComputerCard.id}
            isComputer
            isFlipped={isComputerCardFlipped}
          />
        </motion.div>
      ) : (
        <p>{t('noMoreCards')}</p>
      )}
    </div>
  );
};

export default ComputerArea;
