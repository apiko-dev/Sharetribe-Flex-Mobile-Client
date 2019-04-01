import { StyleSheet } from 'react-native';
import { dimensions, theme, colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  contactContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  rentContainer: {
    flex: 1,
  },

  containerCall: {
    flexGrow: 4,
  },
  buttonContact: {
    borderWidth: StyleSheet.hairlineWidth * 4,
    borderColor: colors.button.borderColorPrimary,
    margin: 5,
    padding: dimensions.indent * 0.5,
    height: theme.button.heightMedium,
  },
  containerChat: {
    flexGrow: 6,
  },
  textChat: {
    color: colors.button.backgroundColorPrimary,
  },

  iconChat: {
    marginRight: 5,
  },

  buttonRent: {
    flex: 1,
    backgroundColor: colors.button.backgroundColorPrimary,
    margin: 5,
    borderWidth: StyleSheet.hairlineWidth * 4,
    borderColor: colors.button.borderColorPrimary,
    padding: dimensions.indent * 0.5,
    height: theme.button.heightMedium,
  },
  containerRent: {
    flex: 1,
  },
  textRent: {
    color: colors.button.textColorPrimary,
  },
});

export default styles;
