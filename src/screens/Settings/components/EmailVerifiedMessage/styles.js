import { StyleSheet } from 'react-native';
import { dimensions } from '../../../../styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: dimensions.indent * 0.4,
  },
  textContainer: {
    marginLeft: dimensions.indent * 0.3,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
