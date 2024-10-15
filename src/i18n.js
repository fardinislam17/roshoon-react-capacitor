import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enUS from './locales/en-US.json';
import enAu from './locales/en-AU.json';
import esEs from './locales/es-ES.json';

const resources = {
  'en-US': {
    translation: enUS,
  },
  'es-ES': {
    translation: esEs,
  },
  'en-AU': {
    translation: enAu,
  },
};

// Initialize i18n
i18n
  .use(LanguageDetector) // Automatically detect language
  .use(initReactI18next) // Pass i18n instance to react-i18next.
  .init({
    resources,
    fallbackLng: 'en-US', // Default language
    debug: true, // Enable console logging for debugging

    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
    detection: {
      order: [
        'navigator',
        'queryString',
        'cookie',
        'localStorage',
        'htmlTag',
        'path',
        'subdomain',
      ],
      lookupQuerystring: 'lng',
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
