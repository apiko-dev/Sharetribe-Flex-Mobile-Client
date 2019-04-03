import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';
import { isSmallDevice, isAndroid } from '../../../../utils';

const smallDevice = isSmallDevice();
const isAndroidDevice = isAndroid();

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.signInSignUpForm.backgroundColor,
    paddingHorizontal: dimensions.indent,
    borderRadius: 10,
  },
  heading: {
    marginTop: dimensions.indent * 1.1,
    marginBottom: dimensions.indent * 1.2,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  textWithTouchableContainer: {
    flexDirection: smallDevice ? 'column' : 'row',
  },
  bottom: {
    marginTop: isSmallDevice
      ? dimensions.indentModerated * 0.7
      : dimensions.indentModerated * 0.9,
    marginBottom: dimensions.indentModerated,
  },
  inputContainerEmail: {
    marginBottom: dimensions.indent * 1.8,
  },
  inputContainerPassword: {
    marginBottom: dimensions.indent,
  },
  buttonContainer: {
    marginTop: isAndroidDevice
      ? dimensions.indent * 0.7
      : dimensions.indent * 1.4,
    marginBottom: isAndroidDevice
      ? dimensions.indent * 0.7
      : dimensions.indent * 1.5,
  },
  alignCenter: {
    justifyContent: 'center',
  },
});
