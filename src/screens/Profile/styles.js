import { StyleSheet } from 'react-native';
import { dimensions } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    width: '100%',
    alignItems: 'center',
    paddingTop: dimensions.indent * 1.3,
  },
  userName: {
    margin: dimensions.indent * 0.5,
  },
});
