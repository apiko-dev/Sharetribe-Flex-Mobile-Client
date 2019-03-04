import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {},
  animatedContainer: {
    height: 46,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.input.borderColor,
  },
  inputLabel: {
    position: 'absolute',
    left: 14,
    top: 15,
    color: colors.input.labelColor,
    backgroundColor: colors.input.labelBackgroundColor,
    paddingHorizontal: 4,
  },
  input: {
    color: colors.input.textColor,
    fontSize: 14,
    height: 46,
    paddingLeft: 16,
    paddingTop: 13,
    paddingBottom: 13,
  },
  activeContainer: {
    borderColor: colors.input.activeBorderColor,
  },
  activeLabel: {
    color: colors.input.activeLabelColor,
  },
});
