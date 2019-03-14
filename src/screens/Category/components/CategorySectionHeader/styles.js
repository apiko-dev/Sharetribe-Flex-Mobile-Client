import { StyleSheet } from 'react-native';
import { dimensions } from '../../../../styles';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: dimensions.indent,
    paddingBottom: dimensions.indent,
    borderBottomWidth: 1,
    marginBottom: dimensions.indent * 0.4,
  },
});
