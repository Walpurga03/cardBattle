import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface WinnerMessageProps {
  winner: string | null;
  showWinnerMessage: boolean;
  selectedProperty: string | null;
  playerValue: number | null;
  computerValue: number | null;
}

const WinnerMessage: React.FC<WinnerMessageProps> = ({ winner, showWinnerMessage, selectedProperty, playerValue, computerValue }) => {
  const { t } = useTranslation();

  if (!showWinnerMessage) return null;

  const winnerName = winner === 'Player' ? t('player') : t('computer');
  const loserName = winner === 'Player' ? t('computer') : t('player');

  return (
    <motion.div
      className="winner-message"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3>
        {winner === 'Tie'
          ? t('tieMessage')
          : t('winMessage', { winner: winnerName, loser: loserName })}
      </h3>
      {selectedProperty && (
        <p>
          {t(`eigenschaften.${selectedProperty}`)}: {playerValue} vs {computerValue}
        </p>
      )}
    </motion.div>
  );
};

export default WinnerMessage;