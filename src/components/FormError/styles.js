import { StyleSheet } from 'react-native';
import { dimensions } from '../../styles';

export default StyleSheet.create({
  container: {
    marginTop: dimensions.indent * 0.4,
    flexDirection: 'row',
  },
  text: {
    marginLeft: dimensions.indent * 0.3,
    marginRight: dimensions.indent,
  },
});
