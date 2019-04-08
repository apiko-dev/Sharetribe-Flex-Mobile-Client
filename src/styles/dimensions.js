import { Platform, Dimensions } from 'react-native';
import { moderateScale, verticalScale } from '../utils/scalingUtils';

export const { width, height } = Dimensions.get('window');

export const avatarSize = 56;

export const indent = 16;
export const indentModerated = moderateScale(16);
export const halfIndent = moderateScale(indent / 2);
export const doubleIndent = moderateScale(indent * 2);

export const verticalIndent = verticalScale(indent);
export const halfVerticalIndent = verticalScale(indent / 2);

export const borderRadius = 4;

export const iconSize = moderateScale(28);
export const bigIconSize = moderateScale(40);
export const iconMargin = Platform.OS === 'android' ? 16 : 10;

export const length =
  width / 3 - (indent + moderateScale(halfIndent / 1.5));

export const headerMaxHeight =
  Platform.OS === 'ios' ? verticalScale(297) : verticalScale(296);
export const headerMinHeight =
  Platform.OS === 'ios' ? verticalScale(110) : verticalScale(107);

export const containerWidth =
  Dimensions.get('window').width - indent * 2;

export const appBarHeight = Platform.OS === 'ios' ? 52 : 56;
export const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
export const headerHeight = appBarHeight + statusBarHeight;
