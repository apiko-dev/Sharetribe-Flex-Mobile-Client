import { Platform } from 'react-native';

const cardShadowByPlatform = {
  ios: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.7,
  },
  android: {
    elevation: 4,
  },
};

export default {
  cardShadow: Platform.select(cardShadowByPlatform),
  cardShadowByPlatform,
};
