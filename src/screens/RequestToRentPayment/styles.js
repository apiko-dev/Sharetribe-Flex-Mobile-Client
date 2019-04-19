import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import { isLargeDevice, isAndroid } from '../../utils';

const isLarge = isLargeDevice();
const isAndroidDevice = isAndroid();

export default StyleSheet.create({
  container: {
    backgroundColor: colors.requestToRentScreen.backgroundColor,
    paddingTop: dimensions.indent * 0.2,
  },
  safeAreaViewContainer: {
    backgroundColor: colors.settingsScreen.backgroundColor,
  },
  buttonContainer: {
    marginTop: dimensions.indent * 1.3,
    marginBottom: isLarge
      ? dimensions.indent * 1.4
      : dimensions.indent,
    marginLeft: dimensions.indent * 2.2,
    marginRight: dimensions.indent * 2.2,
  },
  inputContainer: {
    marginBottom: dimensions.indent * 1.1,
  },
  inputContainerCardDadeAndCVC: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLeft: {
    width: dimensions.indent * 6.9,
    marginRight: dimensions.indent,
  },
  inputRight: {
    width: dimensions.indent * 5.3,
  },
  messageInputContainer: {
    height: dimensions.indent * 11,
    paddingTop: dimensions.indent * 0.5,
    paddingBottom: dimensions.indent * 0.5,
  },
  messageLabel: {
    position: 'absolute',
    top: isAndroidDevice
      ? dimensions.indent * 0.5
      : dimensions.indent * 0.6,
    paddingHorizontal: dimensions.indent * 0.2,
  },
  messageInput: {
    textAlignVertical: 'top',
    height: dimensions.indent * 10,
    paddingTop: dimensions.indent * 0.5,
    margin: 0,
  },
});
