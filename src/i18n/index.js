import i18n from '../libs/expo-i18n';
import en from './locales/en.json';

i18n.fallbacks = true;
i18n.defaultLocale = 'en';

i18n.translations = {
  en,
};

export default i18n;
