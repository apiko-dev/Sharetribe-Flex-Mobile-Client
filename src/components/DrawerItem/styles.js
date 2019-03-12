import { StyleSheet } from 'react-native';
import { dimensions } from '../../styles';

export default StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: dimensions.indent * 0.5,
    padding: dimensions.indent * 0.85,
  },
  text: {
    marginLeft: dimensions.indent * 1.5,
  },
});
