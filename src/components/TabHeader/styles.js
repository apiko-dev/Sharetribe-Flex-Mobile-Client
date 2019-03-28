import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.categoryScreen.itemBorder,
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  active: {
    borderBottomWidth: 3 * StyleSheet.hairlineWidth,
    borderColor: colors.primaryColors.orange,
  },
});

export default styles;
