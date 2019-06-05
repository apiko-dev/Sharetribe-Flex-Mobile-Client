import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';

export default StyleSheet.create({
  container: {
    height: dimensions.indent * 10,
    borderRadius: 10,
    marginHorizontal: '15%',
    marginBottom: dimensions.indent,
  },
  flex: {
    flex: 1,
  },
  imageContainer: {
    flex: 0.6,
    borderTopLeftRadius: dimensions.borderRadius * 2,
    borderTopRightRadius: dimensions.borderRadius * 2,
    overflow: 'hidden',
  },
  infoContainer: {
    flex: 0.4,
    backgroundColor: colors.mapView.cardBackgroundColor,
    padding: dimensions.indent / 2,
    borderBottomLeftRadius: dimensions.borderRadius * 2,
    borderBottomRightRadius: dimensions.borderRadius * 2,
  },
  image: {
    height: dimensions.indent * 6,
  },
  carouselBackgroundImage: {
    height: dimensions.indent * 4,
  },

  priceAndLease: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: dimensions.indent / 2,
  },
  titleTextContainer: {
    marginBottom: dimensions.indent,
  },
  cardsContainer: {
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
  },
});
