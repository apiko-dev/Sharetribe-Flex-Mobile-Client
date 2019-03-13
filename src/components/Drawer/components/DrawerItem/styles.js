import { StyleSheet } from 'react-native';
import { dimensions } from '../../../../styles';
import { isSmallDevice } from '../../../../utils';

const smallDevice = isSmallDevice();

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: dimensions.indent * 0.5,
    padding: smallDevice
      ? dimensions.indent * 0.6
      : dimensions.indent * 0.85,
  },
  text: {
    marginLeft: dimensions.indent * 1.5,
  },
});
