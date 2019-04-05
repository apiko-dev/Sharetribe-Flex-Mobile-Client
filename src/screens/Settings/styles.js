import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import { isAndroid } from '../../utils';

const isAndroidDevice = isAndroid();

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.settingsScreen.backgroundColor,
  },
  inputContainer: {
    marginBottom: dimensions.indent * 1.1,
  },
  inputContainerFirstAndLastNames: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: dimensions.indent * 1.1,
  },
  inputLeft: {
    flex: 2,
    marginRight: dimensions.indent,
  },
  inputRight: {
    flex: 2,
  },
  bioInputContainer: {
    height: dimensions.indent * 15,
    paddingTop: dimensions.indent * 0.5,
    paddingBottom: dimensions.indent * 0.5,
  },
  bioLabel: {
    position: 'absolute',
    top: isAndroidDevice
      ? dimensions.indent * 0.5
      : dimensions.indent * 0.6,
    paddingHorizontal: dimensions.indent * 0.2,
  },
  bioInput: {
    textAlignVertical: 'top',
    height: dimensions.indent * 14,
    paddingTop: dimensions.indent * 0.5,
    margin: 0,
  },
  avatarContainer: {
    flexDirection: 'row',
    marginBottom: dimensions.indent * 2.2,
  },
  tipContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tip: {
    marginBottom: dimensions.indent * 0.5,
  },
  logoImageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 95,
    height: 95,
    borderRadius: 95 / 2,
  },
  logoBackground: {
    resizeMode: 'cover',
    borderRadius: 95 / 2,
  },
  avatar: {
    marginRight: dimensions.indent,
  },
  footer: {
    marginTop: dimensions.indent,
    backgroundColor: colors.settingsScreen.footer,
    flexDirection: 'row',
    width: '100%',
    padding: dimensions.indent * 0.5,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '48%',
  },
});
