import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';
import { isSmallDevice, isMediumDevice } from '../../../../utils';

const smallDevice = isSmallDevice();
const mediumDevice = isMediumDevice();

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.signInSignUpForm.backgroundColor,
    paddingHorizontal: dimensions.indent,
  },
  heading: {
    marginTop: dimensions.indent * 0.8,
    marginBottom: mediumDevice
      ? dimensions.indent * 0.8
      : dimensions.indent,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  textWithTouchableContainer: {
    flexDirection: smallDevice ? 'column' : 'row',
  },
  bottom: {
    marginTop: mediumDevice
      ? dimensions.indent * 0.4
      : dimensions.indent * 0.5,
    marginBottom: mediumDevice
      ? dimensions.indent * 0.7
      : dimensions.indent,
  },
  inputContainerEmail: {
    marginBottom: mediumDevice
      ? dimensions.indent * 0.7
      : dimensions.indent * 0.9,
  },
  inputContainerPassword: {
    marginBottom: mediumDevice
      ? dimensions.indent * 0.4
      : dimensions.indent * 0.5,
  },
  inputContainerFirstAndLastNames: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: mediumDevice
      ? dimensions.indent * 0.7
      : dimensions.indent * 0.9,
  },
  inputContainer: {
    flex: 1,
  },
  inputLeft: {
    marginRight: 20,
  },
  buttonContainer: {
    marginVertical:
      (mediumDevice && dimensions.indent * 0.7) ||
      (smallDevice && dimensions.indent * 0.6) ||
      dimensions.indent,
  },
  alignCenter: {
    justifyContent: 'center',
  },
});
