// lang.jsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import các JSON
import header_en from './locales/en/header.json';
import menu_en from './locales/en/menu.json';
import hero_en from './locales/en/hero.json';
import about_en from './locales/en/about.json';
import services_en from './locales/en/services.json';
import contact_en from './locales/en/contact.json';


import header_vi from './locales/vi/header.json';
import menu_vi from './locales/vi/menu.json';
import hero_vi from './locales/vi/hero.json';
import about_vi from './locales/vi/about.json';
import services_vi from './locales/vi/services.json';
import contact_vi from './locales/vi/contact.json';

const resources = {
  en: {
    translation: {
      ...header_en,
      ...menu_en,
      ...hero_en,
      ...about_en,
      ...services_en,
      ...contact_en,

    }
  },
  vi: {
    translation: {
      ...header_vi,
      ...menu_vi,
      ...hero_vi,
      ...about_vi,
      ...services_vi,
      ...contact_vi,
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
