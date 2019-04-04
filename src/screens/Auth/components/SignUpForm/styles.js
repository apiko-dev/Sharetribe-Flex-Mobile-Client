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
    marginTop: smallDevice
      ? dimensions.indent * 0.9
      : dimensions.indentModerated * 1.1,
    marginBottom: smallDevice
      ? dimensions.indent
      : dimensions.indentModerated * 1.2,
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
    marginBottom: dimensions.indentModerated,
  },
  inputContainerEmail: {
    marginBottom: smallDevice
      ? dimensions.indent * 0.9
      : dimensions.indent * 1.1,
  },
  inputContainerPassword: {
    marginBottom: smallDevice
      ? dimensions.indent * 0.6
      : dimensions.indent * 0.8,
  },
  inputContainerFirstAndLastNames: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: smallDevice
      ? dimensions.indent * 0.9
      : dimensions.indent,
  },
  inputContainer: {
    flex: 1,
  },
  inputLeft: {
    marginRight: dimensions.indent,
  },
  buttonContainer: {
    marginVertical:
      smallDevice || isAndroidDevice
        ? dimensions.indent * 0.6
        : dimensions.indent * 0.8,
  },
  alignCenter: {
    justifyContent: 'center',
  },
});
