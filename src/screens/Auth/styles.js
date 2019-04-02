import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import { isAndroid, isLargeDevice } from '../../utils';

const isAndroidDevice = isAndroid();
const isLarge = isLargeDevice();

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSafeAreaView: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    textAlign: 'center',
    marginBottom: dimensions.indentModerated * 2.3,
  },
  headingSmall: {
    marginBottom: dimensions.indentModerated * 1.3,
  },
  headingLarge: {
    marginTop: dimensions.indentModerated,
    marginBottom: dimensions.indentModerated * 4,
  },
  tabViewContainer: {
    flex: 1,
    marginLeft: dimensions.indent,
    marginRight: dimensions.indent,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.7,
  },
  tabViewWrapper: {
    flex: 1,
    borderRadius: 10,
    marginLeft: 1,
    marginBottom: 3,
    shadowColor: colors.authScreen.shadowColor,
    elevation: 3,
  },
  circle: {
    position: 'absolute',
    width: dimensions.indentModerated * 32,
    height: dimensions.indentModerated * 32,
    borderRadius: (dimensions.indentModerated * 32) / 2,
    left: -73,
    top: -110,
    backgroundColor: colors.authScreen.circle,
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    height: isAndroidDevice
      ? dimensions.indent * 2.4
      : dimensions.indent * 2.8,
  },
  bottomButtonAndroid: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: isAndroidDevice
      ? dimensions.indent * 2.4
      : dimensions.indent * 2.8,
    width: dimensions.width,
    bottom: 0,
    left: 0,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  keyboardAvoidingViewContentContainer: {
    flex: 1,
  },

  toUpperCase: {
    textTransform: 'uppercase',
  },
});
