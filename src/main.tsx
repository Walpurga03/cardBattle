import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './i18n.ts'; // i18n-Setup importieren

const Main = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.twentyuno.net/js/app.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<Main />);