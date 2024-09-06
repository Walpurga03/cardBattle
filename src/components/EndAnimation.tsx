import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import '../styles/main.scss';
import cardsData from '../../public/assets/data/cards.json'; // Importiere die JSON-Datei

const EndAnimation = ({ playerWon }: { playerWon: boolean }) => {
  const containerRef = useRef<HTMLDivElement | null>(null); // Ändere den Typ zu HTMLDivElement
  const message = playerWon ? "You Win!" : "You Lose!";
  const messageColor = playerWon ? "#fff" : "#fff";
  const backgroundColor = playerWon ? "#4CAF50" : "#e80202"; // Grün für Gewinn, Rot für Verlust

  useEffect(() => {
    const container = containerRef.current as HTMLDivElement; // Ändere den Typ zu HTMLDivElement
    const blockColorClass = playerWon ? 'block-green' : 'block-red'; // Bestimmen der Klasse basierend auf playerWon

    for (let i = 0; i < 25; i++) {
      const blocks = document.createElement('div');
      blocks.classList.add('block', blockColorClass);

      // Einen Bildindex der Reihe nach auswählen, beginnend mit 0, und wieder von vorne beginnen, wenn das Ende erreicht ist
      const cardIndex = i % cardsData.length;
      const card = cardsData[cardIndex];
      const cardImage = `${import.meta.env.BASE_URL}assets/images/${card.image}`; // Verwende den generierten Bildpfad
      const cardName = card.name; // Name des Bildes

      // Erstellen Sie ein <img> Element für das Bild
      const imgElement = document.createElement('img');
      imgElement.src = cardImage;
      imgElement.style.width = '100%'; // Optional: Bildgröße anpassen
      imgElement.style.height = 'auto'; // Optional: Bildgröße anpassen

      // Erstellen Sie ein <p> Element für den Namen des Bildes
      const nameElement = document.createElement('p');
      nameElement.textContent = cardName;
      nameElement.style.color = '#fff'; // Optional: Textfarbe anpassen
      nameElement.style.textAlign = 'center'; // Optional: Text zentrieren

      // Fügen Sie das <img> und <p> Element dem Block hinzu
      blocks.appendChild(imgElement);
      blocks.appendChild(nameElement);

      if (container) {
        container.appendChild(blocks);
      }
    }

    // Funktion zur Animation der Blöcke
    const animateBlocks = () => {
      anime({
        targets: container.querySelectorAll('.block'),
        translateX: () => anime.random(-700, 700), // Zufällige Bewegung auf der X-Achse
        translateY: () => anime.random(-700, 700), // Zufällige Bewegung auf der Y-Achse
        scale: () => anime.random(0.5, 5), // Zufällige Skalierung
        easing: 'easeInOutQuad', // Weiche Bewegung
        duration: 3000, // Dauer der Animation (1 Sekunde)
        complete: animateBlocks, // Rekursiver Aufruf, um die Animation unendlich durchlaufen zu lassen
      });
    };

    animateBlocks();
  }, [playerWon]); // Der playerWon Zustand wird als Abhängigkeit hinzugefügt, falls sich die Logik je nach Spielergebnis ändert

  return (
    <div className='end-animation-container' ref={containerRef} style={{ background: backgroundColor }}>
      <div className='end-animation-content'>
        <h2 className='end-animation-message' style={{ color: messageColor }}>
          <span>Money Wars<br /></span>{message}
        </h2>
        <button className='end-animation-button' onClick={() => window.location.reload()}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default EndAnimation;