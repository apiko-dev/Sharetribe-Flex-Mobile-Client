import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';
import { isSmallDevice } from '../../../../utils';

const smallDevice = isSmallDevice();

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.signInSignUpForm.backgroundColor,
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
  textWithTouchableContainer: {
    flexDirection: smallDevice ? 'column' : 'row',
  },
  bottom: {
    marginTop: dimensions.indent * 0.7,
    marginBottom: dimensions.indent,
  },
  inputContainerEmail: {
    marginBottom: dimensions.indent * 1.6,
  },
  inputContainerPassword: {
    marginBottom: dimensions.indent,
  },
  buttonContainer: {
    marginVertical: dimensions.indent * 1.2,
  },
  alignCenter: {
    justifyContent: 'center',
  },
});
