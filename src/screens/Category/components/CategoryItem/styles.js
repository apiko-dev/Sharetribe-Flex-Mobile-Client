import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.categoryScreen.itemBorder,
    borderBottomWidth: 1,
    paddingTop: dimensions.indent * 0.8,
    paddingBottom: dimensions.indent * 0.8,
  },
  text: {
    paddingLeft: dimensions.indent,
  },
});
