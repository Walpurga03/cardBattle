export function getAnimation(animationDirection: string | null) {
  switch (animationDirection) {
    case 'left':
      return { x: '-3000%', opacity: 0 }; // Karte nach links bewegen
    case 'right':
      return { x: '3000%', opacity: 0 }; // Karte nach rechts bewegen
    case 'up':
      return { y: '-3000%', opacity: 0 }; // Karte nach oben bewegen
    default:
      return {};
  }
}