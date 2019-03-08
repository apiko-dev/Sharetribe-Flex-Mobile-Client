import { Platform, Dimensions } from 'react-native';

export const isAndroid = () => Platform.OS === 'android';

export const isSmallDevice = () =>
  Dimensions.get('window').width <= 320 &&
  Dimensions.get('window').height <= 600;

export const isLargeDevice = () =>
  Dimensions.get('window').width >= 325 &&
  Dimensions.get('window').height >= 750;
