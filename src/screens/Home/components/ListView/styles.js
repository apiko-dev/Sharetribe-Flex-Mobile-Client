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
  sectionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: dimensions.indent * 0.7,
    marginBottom: dimensions.indent * 0.4,
    paddingHorizontal: dimensions.indent * 1.2,
  },
  listContainer: {
    flex: 1,
  },
});
