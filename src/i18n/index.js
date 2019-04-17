import { LocaleConfig } from 'react-native-calendars';
import i18n from '../libs/expo-i18n';
import en from './locales/en.json';

LocaleConfig.locales[i18n.locale] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

LocaleConfig.defaultLocale = 'en';

i18n.fallbacks = true;
i18n.defaultLocale = 'en';

i18n.translations = {
  en,
};

export default i18n;
