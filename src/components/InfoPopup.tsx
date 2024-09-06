import { useState } from 'react';
import '../styles/main.scss';

const InfoPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <button className="button info-button" onClick={togglePopup}>Info</button>
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="properties-info">
              <h2>Regeln & Kategorien</h2>
              <ul>
                <li>Der Spieler wählt eine Kategorie</li>
                <li>Der Spieler mit dem höchsten Wert gewinnt die Karte des anderen.</li>
                <li>Bei gleichen Wert, bekommt der Gewinner der nächsten Runde diese Karten.</li>
                <li>Das Spiel endet, wenn ein Spieler alle Karten gewonnen hat</li>
              </ul>
            </div>
            <div>
              <lightning-widget
                background-image="images/background/matrix.png"
                name="Gefällt Ihnen das Spiel?"
                button-text="Danke für die Sats"
                to="aldobarazutti@getalby.com"
                labels="☕,🍺,🍕"
                amounts="2500,5000,25000"
                accent="#000">
              </lightning-widget>
            </div>
            <div className='schliesen-button'>
              <button className="button" onClick={togglePopup}>Schließen</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoPopup;