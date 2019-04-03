import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tabViewHeader.backgroundColor,
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
  text: {
    color: colors.tabViewHeader.text,
  },
  activeText: {
    color: colors.tabViewHeader.activeText,
  },
});

export default styles;
