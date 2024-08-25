import React from 'react';
import { useTranslation } from 'react-i18next';
import cards from '../assets/cards.json';

interface CardComponentProps {
  cardId: string;
  onSelectProperty?: (property: 'eigenschaft1' | 'eigenschaft2' | 'eigenschaft3' | 'eigenschaft4' | 'eigenschaft5') => void;
  isComputer?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({ cardId, onSelectProperty, isComputer }) => {
  const { t } = useTranslation();

  const card = cards.find((card) => card.id === cardId);

  if (!card) {
    return <div>Karte nicht gefunden!</div>;
  }

  // Eigenschaftsnamen aus den Übersetzungsdateien laden
  const renderProperty = (propertyKey: 'eigenschaft1' | 'eigenschaft2' | 'eigenschaft3' | 'eigenschaft4' | 'eigenschaft5') => {
    const propertyLabel = t(`eigenschaften.${propertyKey}`); // Zentraler Zugriff auf die Eigenschaftsnamen
    const propertyValue = card.eigenschaften[propertyKey];

    return (
      <li
        key={propertyKey}
        onClick={() => !isComputer && onSelectProperty && onSelectProperty(propertyKey)} // Nur klickbar, wenn es keine Computerkarte ist
        style={{ cursor: isComputer ? 'default' : 'pointer', color: isComputer ? 'grey' : 'black' }}
      >
        {propertyLabel}: {propertyValue}
      </li>
    );
  };

  return (
    <div>
      <h2>{t(`cards.${cardId}.name`)}</h2>
      <img src={card.image} alt={t(`cards.${cardId}.name`)} />
      <ul>
        {renderProperty('eigenschaft1')}
        {renderProperty('eigenschaft2')}
        {renderProperty('eigenschaft3')}
        {renderProperty('eigenschaft4')}
        {renderProperty('eigenschaft5')}
      </ul>
      <p>{t(`cards.${cardId}.textinfo`)}</p>
    </div>
  );
};

export default CardComponent;
