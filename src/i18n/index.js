import { LocaleConfig } from 'react-native-calendars';
import i18n from '../libs/expo-i18n';
import en from './locales/en.json';

LocaleConfig.locales.en = {
  monthNames: en.monthNames,
  monthNamesShort: en.monthNamesShort,
  dayNames: en.dayNames,
  dayNamesShort: en.dayNamesShort,
};

LocaleConfig.defaultLocale = 'en';

i18n.fallbacks = true;
i18n.defaultLocale = 'en';

i18n.translations = {
  en,
};

export default i18n;
