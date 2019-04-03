import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  description: {
    backgroundColor: colors.productScreen.white,
    borderBottomColor: colors.input.borderColor,
    borderBottomWidth: 2 * StyleSheet.hairlineWidth,
  },
  textContainer: {
    margin: dimensions.indent,
    marginBottom: 0,
  },

  flex: {
    flex: 1,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.productScreen.white,
    margin: dimensions.indent / 2,
  },
});
