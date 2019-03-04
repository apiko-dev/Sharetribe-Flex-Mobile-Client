import { Platform, Dimensions } from 'react-native';

export const isAndroid = () => Platform.OS === 'android';

export const isSmallDevice = () =>
  Dimensions.get('window').width <= 320;
