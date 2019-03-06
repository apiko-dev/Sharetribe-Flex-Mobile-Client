import { StyleSheet } from 'react-native';
import { colors, fontSizes, dimensions } from '../../styles';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.authScreen.backgroundColor,
    justifyContent: 'center',
  },
  containerSafeAreaView: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: fontSizes.xlarge,
    marginBottom: dimensions.indent * 2.3,
  },
  headingSmall: {
    fontSize: fontSizes.medium,
    marginBottom: dimensions.indent * 1.3,
  },
  headingLarge: {
    fontSize: fontSizes.xlarge,
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
  tabView: {
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
    height: 48,
  },
  toUpperCase: {
    textTransform: 'uppercase',
  },
});
