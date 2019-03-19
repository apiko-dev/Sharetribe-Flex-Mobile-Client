import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

export default StyleSheet.create({
  container: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.switch.borderColor,
    width: dimensions.indent * 3.5,
    height: dimensions.indent * 1.5,
    backgroundColor: colors.switch.backgroundColor,
    paddingHorizontal: dimensions.indent * 0.4,
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {},
  activeButton: {
    backgroundColor: colors.switch.activeBackgroundColor,
    borderRadius: 30 / 2,
    padding: dimensions.indent * 0.2,
  },
});
