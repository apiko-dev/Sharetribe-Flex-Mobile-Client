import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import { fontSizes } from '../../styles';

export default StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 15,
  },
  view: {
    backgroundColor: colors.button.backgroundColor,
    borderColor: colors.button.borderColor,
    borderWidth: 1,
  },
  text: {
    color: colors.button.textColor,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: fontSizes.medium,
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
  primaryText: {
    color: colors.button.textColorPrimary,
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
