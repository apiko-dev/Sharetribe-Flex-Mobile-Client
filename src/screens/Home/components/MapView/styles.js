import { StyleSheet } from 'react-native';
import { dimensions } from '../../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: dimensions.indent * 2.8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
