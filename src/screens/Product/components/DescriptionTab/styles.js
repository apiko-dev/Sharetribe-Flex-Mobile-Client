import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomColor: colors.input.borderColor,
    borderBottomWidth: 2 * StyleSheet.hairlineWidth,
    elevation: 2,
  },
  textContainer: {
    margin: 16,
  },
  maxHeight: {
    minHeight: 50,
    maxHeight: 100,
  },

  text: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});
