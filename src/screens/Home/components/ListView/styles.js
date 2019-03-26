import { StyleSheet } from 'react-native';
import { dimensions } from '../../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: dimensions.indent * 0.1,
  },
  listContainer: {
    flex: 1,
  },
});
