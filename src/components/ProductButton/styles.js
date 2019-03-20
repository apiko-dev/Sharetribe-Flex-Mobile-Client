import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../styles';

export default StyleSheet.create({
  container: {
    margin: dimensions.indent * 0.3,
    borderRadius: 5,
    width: dimensions.indent * 9.5,
    height: dimensions.indent * 11,
    backgroundColor: colors.productButton.backgroundColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    height: dimensions.indent * 7.5,
    width: dimensions.indent * 9.5,
  },
  imageContainer: {
    overflow: 'hidden',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  infoContainer: {
    paddingTop: dimensions.indent * 0.2,
    paddingHorizontal: dimensions.indent * 0.5,
  },
});
