import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

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
  },
  primaryView: {
    backgroundColor: colors.button.backgroundColorPrimary,
    shadowColor: colors.button.shadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  primaryText: {
    color: colors.button.textColorPrimary,
  },
});
