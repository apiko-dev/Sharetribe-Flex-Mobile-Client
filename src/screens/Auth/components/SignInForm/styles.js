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
    marginTop: 16,
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
    marginTop: 12,
    marginBottom: mediumDevice
      ? dimensions.indent * 0.8
      : dimensions.indent,
  },
  inputContainerEmail: {
    marginBottom: mediumDevice
      ? dimensions.indent
      : dimensions.indent * 1.6,
  },
  inputContainerPassword: {
    marginBottom: dimensions.indent,
  },
  buttonContainer: {
    marginVertical: mediumDevice
      ? dimensions.indent * 0.8
      : dimensions.indent * 1.2,
  },
  alignCenter: {
    justifyContent: 'center',
  },
});
