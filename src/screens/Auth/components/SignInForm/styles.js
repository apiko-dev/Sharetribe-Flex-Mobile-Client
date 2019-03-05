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
    marginTop: 16,
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
