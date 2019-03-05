/* export default {
  verySmall: 12,
  small: 13,
  medium: 14,
  large: 16,
  veryLarge: 18,
  veryLargeHeading: 22,
}; */

import { moderateScale } from '../utils/scalingUtils';

const fontSizes = {
  xxbig: moderateScale(52),
  xbig: moderateScale(38),
  big: moderateScale(32),
  xlarge: moderateScale(26),
  large: moderateScale(22),
  xxmedium: moderateScale(20),
  xmedium: moderateScale(18),
  medium: moderateScale(14),
  xxsmall: moderateScale(14),
  small: moderateScale(12),
  xsmall: moderateScale(10),
};

export default fontSizes;
