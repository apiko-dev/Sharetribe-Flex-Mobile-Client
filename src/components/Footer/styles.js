import { StyleSheet } from 'react-native';
import { theme, colors, dimensions } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  contactContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rentContainer: {
    flex: 1,
    margin: 5,
  },

  containerCall: {
    flexGrow: 4,
    marginHorizontal: 5,
  },
  buttonContact: {
    borderWidth: StyleSheet.hairlineWidth * 3,
    borderColor: colors.button.borderColorPrimary,
    paddingVertical: dimensions.indent / 2,
    height: theme.button.heightMedium,
  },
  containerChat: {
    flexGrow: 6,
    marginHorizontal: 5,
  },
  textChat: {
    color: colors.button.backgroundColorPrimary,
  },

  iconChat: {
    marginRight: dimensions.indent / 2,
  },

  buttonRent: {
    flex: 1,
    height: theme.button.heightMedium,
    padding: null,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth * 3,
    borderColor: colors.button.borderColorPrimary,
  },
  containerRent: {
    flex: 1,
  },
});

export default styles;
