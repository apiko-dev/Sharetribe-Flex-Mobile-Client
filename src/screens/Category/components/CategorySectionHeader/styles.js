import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: dimensions.indent,
    paddingBottom: dimensions.indent,
    borderBottomWidth: 1,
    borderColor: colors.categoryScreen.sectionBorder,
    marginBottom: dimensions.indent * 0.4,
  },
});
