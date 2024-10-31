// src/components/LastRoundDetails.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PropertyKey } from '../types/Card';

interface LastRoundDetailsProps {
  selectedProperty: PropertyKey | null;
  playerValue: number | null;
  computerValue: number | null;
}

const LastRoundDetails: React.FC<LastRoundDetailsProps> = ({
  selectedProperty,
  playerValue,
  computerValue
}) => {
  const { t } = useTranslation();

  if (!selectedProperty) return null;

  return (
    <div className="last-round-details">
      <h3>{t('lastRound')}</h3>
      <p>
        {t(`eigenschaften.${selectedProperty}`)}
        <br />
        {t('player')}: {playerValue}
        <br />
        {t('computer')}: {computerValue}
      </p>
    </div>
  );
};

export default LastRoundDetails;