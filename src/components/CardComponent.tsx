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
    const propertyLabel = t(`eigenschaften.${propertyKey}`);
    const propertyValue = card.eigenschaften[propertyKey];

    return (
      <li
        key={propertyKey}
        onClick={() => !isComputer && onSelectProperty && onSelectProperty(propertyKey)}
        style={{ cursor: isComputer ? 'default' : 'pointer', color: isComputer ? 'grey' : 'black', margin: '10px 0' }}
      >
        <span className="property-label">{propertyLabel}</span>
        <span className="property-value">{propertyValue}</span>
        {/* Nur Skala für andere Eigenschaften anzeigen */}
        {propertyKey !== 'eigenschaft1' && (
          <div className="rating-scale">
            <div
              className="rating-bar"
              style={{
                width: `${(propertyValue / 5) * 100}%`,
                backgroundColor: propertyKey === 'eigenschaft2' ? '#E09594' :
                  propertyKey === 'eigenschaft3' ? '#92B4DE' :
                    propertyKey === 'eigenschaft4' ? '#76C9B4' : '#E0C3B0',
              }}
            />
          </div>
        )}
      </li>
    );
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <h2>{t(`cards.${cardId}.name`)}</h2>
      </div>
      <img src={card.image} alt={t(`cards.${cardId}.name`)} className="card-image" />
      <ul className="card-properties">
        {renderProperty('eigenschaft1')} {/* Erste Eigenschaft ohne Skala */}
        {renderProperty('eigenschaft2')}
        {renderProperty('eigenschaft3')}
        {renderProperty('eigenschaft4')}
        {renderProperty('eigenschaft5')}
      </ul>
      <p className="card-description">{t(`cards.${cardId}.textinfo`)}</p>
    </div>
  );
};

export default CardComponent;
