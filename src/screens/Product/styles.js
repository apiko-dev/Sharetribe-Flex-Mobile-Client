import { StyleSheet, StatusBar } from 'react-native';
import { colors, dimensions } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 325,
  },
  carouselBackgroundImage: {
    height: 325,
  },

  paginationContainerStyle: {
    right: 0,
    left: 0,
    top: 270,
    position: 'absolute',
  },

  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 0,
    backgroundColor: colors.switch.activeIcon,
  },

  infoContainer: {
    marginTop: dimensions.indent * 0.75, // 12
    marginHorizontal: dimensions.indent,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: dimensions.indent / 2,
  },

  day: {
    marginBottom: 4,
  },

  titleTextContainer: {
    marginBottom: dimensions.indent,
  },

  containerTabView: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabDescription: {
    flex: 1,
    justifyContent: 'center',
  },
  tabReviews: {
    flex: 1,
    justifyContent: 'center',
  },
  labelContainer: {
    padding: dimensions.indent,
  },
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
});
