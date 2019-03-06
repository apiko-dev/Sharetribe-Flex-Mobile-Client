import RNLanguages from 'react-native-languages';
import I18n from './vendor/i18n';

I18n.initAsync = async () => {
  try {
    const locale = RNLanguages.language;
    I18n.locale = (locale) ? locale.replace(/_/, '-') : '';
  } catch (err) {
    I18n.locale = 'en';
  }
};

export default I18n;
