import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.resetPasswordModal.backgroundColor,
    paddingHorizontal: dimensions.indent,
    borderRadius: 10,
  },

  heading: {
    marginTop: dimensions.indent * 0.8,
    marginBottom: dimensions.indent,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  closeIconContainer: {
    position: 'absolute',
    right: dimensions.indent,
    top: dimensions.indent,
  },
  inputContainer: {
    marginTop: dimensions.indent * 1.8,
    marginBottom: dimensions.indent,
  },
  buttonContainer: {
    marginBottom: dimensions.indent * 3.1,
  },
  alignCenter: {
    justifyContent: 'center',
  },
});
