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
    margin: 16,
    marginBottom: 0,
  },
  maxHeight: {
    minHeight: dimensions.indent,
    maxHeight: 100,
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
