import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import cards from '../assets/cards.json';

interface CardComponentProps {
  cardId: string;
  onSelectProperty?: (property: 'eigenschaft1' | 'eigenschaft2' | 'eigenschaft3' | 'eigenschaft4' | 'eigenschaft5') => void;
  isComputer?: boolean;
  isFlipped?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({ cardId, onSelectProperty, isComputer, isFlipped }) => {
  const { t } = useTranslation();

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
      initial={isFlipped ? "hidden" : "visible"}
      animate={isFlipped ? "hidden" : "visible"}
      variants={flipAnimation}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <div className="card card-front">
        <div className="card-header">
          <h2>{t(`cards.${cardId}.name`)}</h2>
        </div>
        <img src={card.image} alt={t(`cards.${cardId}.name`)} className="card-image" />
        <ul className="card-properties">
          {renderProperty('eigenschaft1')}
          {renderProperty('eigenschaft2')}
          {renderProperty('eigenschaft3')}
          {renderProperty('eigenschaft4')}
          {renderProperty('eigenschaft5')}
        </ul>
        <p className="card-description">{t(`cards.${cardId}.textinfo`)}</p>
      </div>
      <div className="card card-back">
        <img src="/assets/images/backSite.png" alt="Card Back" />
      </div>
    </motion.div>
  );
};

export default CardComponent;
