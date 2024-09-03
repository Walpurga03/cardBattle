import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface WinnerMessageProps {
  winner: string | null;
  showWinnerMessage: boolean;
}

const WinnerMessage: React.FC<WinnerMessageProps> = ({ winner, showWinnerMessage }) => {
  const { t } = useTranslation();

  if (!showWinnerMessage) return null;

  return (
    <motion.div
      className="winner-message"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3>{winner === 'Tie' ? t('tieMessage') : t('winMessage', { winner })}</h3>
    </motion.div>
  );
};

export default WinnerMessage;

