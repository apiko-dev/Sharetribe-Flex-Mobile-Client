import { StyleSheet } from 'react-native';
import { fontSizes, colors } from '../../../../styles';
import { isSmallDevice, isMediumDevice } from '../../../../utils';
import * as dimensions from '../../../../utils/dimensions';

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
    fontWeight: '700',
    fontSize: fontSizes.xxmedium,
    color: colors.signInSignUpForm.heading,
  },
  smallFontSize: {
    fontSize: fontSizes.small,
  },
  text: {
    fontSize: fontSizes.medium,
    textAlign: 'center',
    color: colors.signInSignUpForm.text,
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
    marginVertical: mediumDevice
      ? dimensions.indent * 0.7
      : dimensions.indent,
  },
  alignCenter: {
    justifyContent: 'center',
  },
});
