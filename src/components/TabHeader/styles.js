import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tabViewHeader.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.categoryScreen.itemBorder,
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: dimensions.indent,
  },

  active: {
    borderBottomWidth: 3 * StyleSheet.hairlineWidth,
    borderColor: colors.primaryColors.orange,
  },
  activeText: {
    color: colors.text.orange,
  },
});

export default styles;
