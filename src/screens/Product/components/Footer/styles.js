import { StyleSheet } from 'react-native';
import { theme, colors } from '../../../../styles';

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
    padding: 5,
  },

  containerCall: {
    flexGrow: 4,
    marginHorizontal: 5,
  },
  buttonContact: {
    borderWidth: StyleSheet.hairlineWidth * 3,
    borderColor: colors.button.borderColorPrimary,
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
    marginRight: 5,
  },

  buttonRent: {
    flex: 1,
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
