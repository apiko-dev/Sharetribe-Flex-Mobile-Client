import { StyleSheet } from 'react-native';
import { colors, fontSizes } from '../../styles';
import { isSmallDevice } from '../../utils/detectDevice';

const smallDevice = isSmallDevice();

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.authScreen.backgroundColor,
    justifyContent: 'center',
  },
  heading: {
    color: colors.authScreen.heading,
    fontSize: smallDevice ? 20 : fontSizes.authScreen.heading,
    textAlign: 'center',
    marginBottom: smallDevice ? 10 : 32,
  },
  logo: {
    alignSelf: 'center',
    marginTop: smallDevice ? 10 : 35,
    marginBottom: smallDevice ? 10 : 18,
    height: smallDevice ? 40 : 90,
    width: smallDevice ? 100 : 200,
  },
  tabViewContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    shadowColor: colors.authScreen.shadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  tabView: {
    flex: 1,
    borderRadius: 10,
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
});
