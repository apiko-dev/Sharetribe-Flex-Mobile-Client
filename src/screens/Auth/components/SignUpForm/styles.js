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
    marginTop: dimensions.indent * 0.5,
    marginBottom: dimensions.indent,
  },
  inputContainerEmail: {
    marginBottom: dimensions.indent * 0.9,
  },
  inputContainerPassword: {
    marginBottom: dimensions.indent * 0.5,
  },
  inputContainerFirstAndLastNames: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: dimensions.indent * 0.9,
  },
  inputContainer: {
    flex: 1,
  },
  inputLeft: {
    marginRight: dimensions.indent,
  },
  buttonContainer: {
    marginVertical:
      (smallDevice && dimensions.indent * 0.6) || dimensions.indent,
  },
  alignCenter: {
    justifyContent: 'center',
  },
});
