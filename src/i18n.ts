import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    backend: {
      // Dynamischer Pfad basierend auf der Umgebungsbasis-URL
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/cardText.json`
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

console.log('i18n configuration loaded with base URL:', import.meta.env.BASE_URL); // Log-Ausgabe hinzufügen

export default i18n;
