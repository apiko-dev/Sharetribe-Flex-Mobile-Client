import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

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
    marginBottom: dimensions.indent * 2.3,
  },
  headingSmall: {
    marginBottom: dimensions.indent * 1.3,
  },
  headingLarge: {
    marginTop: dimensions.indent,
    marginBottom: dimensions.indent * 4,
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
    width: 510,
    height: 510,
    borderRadius: 510 / 2,
    left: -73,
    top: -110,
    backgroundColor: colors.authScreen.circle,
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    height: dimensions.indent * 1.9,
  },
  bottomButtonAndroid: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: dimensions.indent * 1.9,
    width: dimensions.width,
    bottom: 0,
    left: 0,
  },

  toUpperCase: {
    textTransform: 'uppercase',
  },
});
