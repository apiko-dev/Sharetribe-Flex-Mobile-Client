import * as scalingUtils from './scalingUtils';
import * as regExp from './regExp';
import * as objectUtils from './objectUtils';
import * as hocs from './hocs';

export {
  isAndroid,
  isSmallDevice,
  isLargeDevice,
} from './detectDevice';
export { scalingUtils, regExp, objectUtils, hocs };

export { default as delay } from './delay';
export { default as getImageUrl } from './getImageUrl';
export { default as formatPrice } from './formatPrice';
