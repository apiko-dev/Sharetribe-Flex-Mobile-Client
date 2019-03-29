import { Platform } from 'react-native';

export default {
  cardShadow: Platform.select({
    ios: {
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.7,
    },
    android: {
      elevation: 4,
    },
  }),
};
