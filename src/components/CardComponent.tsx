import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import cards from '../../public/assets/data/cards.json';

interface CardComponentProps {
  cardId: number; // cardId bleibt vom Typ number
  onSelectProperty?: (property: 'eigenschaft1' | 'eigenschaft2' | 'eigenschaft3' | 'eigenschaft4' | 'eigenschaft5') => void;
  isComputer?: boolean;
  isFlipped?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({ cardId, onSelectProperty, isComputer, isFlipped }) => {
  const { t } = useTranslation();

  // Konvertieren Sie die cardId in einen String, um sie als Übersetzungsschlüssel zu verwenden
  const cardKey = cardId.toString();
  const card = cards.find((card) => card.id === cardId);

  if (!card) {
    return <div>Karte nicht gefunden!</div>;
  }

  const flipAnimation = {
    hidden: { rotateY: 180 },
    visible: { rotateY: 0 },
  };

  const renderProperty = (propertyKey: 'eigenschaft1' | 'eigenschaft2' | 'eigenschaft3' | 'eigenschaft4' | 'eigenschaft5') => {
    const propertyLabel = t(`eigenschaften.${propertyKey}`);
    const propertyValue = card.eigenschaften[propertyKey];

    return (
      <li
        key={propertyKey}
        onClick={() => !isComputer && onSelectProperty && onSelectProperty(propertyKey)}
        style={{ cursor: isComputer ? 'default' : 'pointer', color: 'black', margin: '10px 0' }}
      >
        <span className="property-label">{propertyLabel}</span>
        <span className="property-value">{propertyValue}</span>
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
    <motion.div
      className="card-flip"
      initial={isFlipped ? 'hidden' : 'visible'}
      animate={isFlipped ? 'hidden' : 'visible'}
      variants={flipAnimation}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="card card-front">
        <div className="card-header">
          {/* Verwenden Sie cardKey als String, um auf die Übersetzung zuzugreifen */}
          <h2>{cardKey ? t(`cards.${cardKey}.name`) : 'Name nicht verfügbar'}</h2>
        </div>
        <img src={card.image} alt={cardKey ? t(`cards.${cardKey}.name`) : ''} className="card-image" />
        <ul className="card-properties-list">
          {renderProperty('eigenschaft1')}
          {renderProperty('eigenschaft2')}
          {renderProperty('eigenschaft3')}
          {renderProperty('eigenschaft4')}
          {renderProperty('eigenschaft5')}
        </ul>
        {/* Verwenden Sie cardKey als String, um auf die Übersetzung zuzugreifen */}
        <p className="card-description">{cardKey ? t(`cards.${cardKey}.textinfo`) : 'Beschreibung nicht verfügbar'}</p>
      </div>
      <div className="card card-back">
        <img src="/assets/images/backSite.png" alt="Card Back" />
      </div>
    </motion.div>
  );
};

export default CardComponent;
