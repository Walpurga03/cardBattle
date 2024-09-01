import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dynamische Basis-URL für die Entwicklung und Produktion
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/cardBattle/' : '/', // Basis-URL dynamisch setzen
});
