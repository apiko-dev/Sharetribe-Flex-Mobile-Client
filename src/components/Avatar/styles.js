import { StyleSheet } from 'react-native';
import { dimensions } from '../../styles';

export default StyleSheet.create({
  addGoodsButtonContainer: {
    marginTop: dimensions.indent,
    marginLeft: dimensions.indent,
    marginRight: dimensions.indent,
    marginBottom: dimensions.indent * 1.5,
  },
  logoImageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  logoImageBackgroundMedium: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  logoImageBackgroundSmall: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  logoImageBackgroundLarge: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
  },
  logoBackground: {
    resizeMode: 'cover',
  },
  logoBackgroundMedium: {
    resizeMode: 'cover',
    borderRadius: 70 / 2,
  },
  logoBackgroundSmall: {
    resizeMode: 'cover',
    borderRadius: 50 / 2,
  },
  logoBackgroundLarge: {
    resizeMode: 'cover',
    borderRadius: 90 / 2,
  },
});
