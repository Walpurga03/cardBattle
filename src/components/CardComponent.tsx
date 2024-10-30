import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import cards from '../../public/assets/data/cards.json';

interface CardComponentProps {
  cardId: number;
  onSelectProperty?: (property: 'eigenschaft1' | 'eigenschaft2' | 'eigenschaft3' | 'eigenschaft4' | 'eigenschaft5') => void;
  isComputer?: boolean;
  isFlipped?: boolean;
  className?: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ cardId, onSelectProperty, isComputer, isFlipped, className }) => {
  const { t } = useTranslation();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const cardKey = cardId.toString();
  const card = cards.find((card) => card.id === cardId);

  if (!card) {
    return <div>Karte nicht gefunden!</div>;
  }

  const imagePath = `${import.meta.env.BASE_URL}assets/images/${card.image}`;

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
    <>
      <motion.div
        className={`card-flip ${className}`}
        initial={isFlipped ? 'hidden' : 'visible'}
        animate={isFlipped ? 'hidden' : 'visible'}
        variants={flipAnimation}
        transition={{ duration: 0.1 }}
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      >
        <div className="card card-front">
          <div className="card-header">
            <h2>{cardKey ? t(`cards.${cardKey}.name`) : 'Name nicht verfügbar'}</h2>
          </div>
          <img
            src={imagePath}
            alt={cardKey ? t(`cards.${cardKey}.name`) : ''}
            className="card-image"
          />
          <ul className="card-properties-list">
            {renderProperty('eigenschaft1')}
            {renderProperty('eigenschaft2')}
            {renderProperty('eigenschaft3')}
            {renderProperty('eigenschaft4')}
            {renderProperty('eigenschaft5')}
          </ul>
          <button 
            className="description-button"
            onClick={() => setIsDescriptionOpen(true)}
          >
            {t('showDescription')}
          </button>
        </div>
        <div className="card-back">
          <img
            src={`${import.meta.env.BASE_URL}assets/images/backSite.png`}
            alt="Card Back"
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {isDescriptionOpen && (
          <motion.div
            className="description-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDescriptionOpen(false)}
          >
            <motion.div
              className="description-popup"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3>{cardKey ? t(`cards.${cardKey}.name`) : 'Name nicht verfügbar'}</h3>
              <p>{cardKey ? t(`cards.${cardKey}.textinfo`) : 'Beschreibung nicht verfügbar'}</p>
              <button 
                className="close-button"
                onClick={() => setIsDescriptionOpen(false)}
              >
                {t('close')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CardComponent;