// i18n.js

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: { translation: require('~/assets/translations/en.json') },
  },
  fallbackLng: 'en',
});

export default i18next;
