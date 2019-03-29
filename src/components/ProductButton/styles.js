import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../styles';
import { isSmallDevice } from '../../utils';

const isSmall = isSmallDevice();

export default StyleSheet.create({
  container: {
    margin: dimensions.indent * 0.3,
    borderRadius: 5,
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
    width: isSmall
      ? dimensions.indent * 9.3
      : dimensions.indent * 9.5,
  },
  containerTouchable: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  containerContent: {
    width: isSmall
      ? dimensions.indent * 9.3
      : dimensions.indent * 9.5,
    height: dimensions.indent * 11,
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
  buttonByWindowWidth: {
    width: (dimensions.width - dimensions.indentModerated * 1.7) / 2,
  },
  imageByWindowWidth: {
    height: dimensions.indent * 7.6,
    width: '100%',
  },
});
