import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

export default StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: dimensions.indent * 0.8,
  },
  view: {
    backgroundColor: colors.button.backgroundColor,
    borderColor: colors.button.borderColor,
    borderWidth: 1,
  },
  text: {
    textAlign: 'center',
  },
  primaryView: {
    backgroundColor: colors.button.backgroundColorPrimary,
    shadowColor: colors.button.shadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.7,

    elevation: 3,
  },
  disable: {
    backgroundColor: colors.button.disableColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
});
