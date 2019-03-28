import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';

export default StyleSheet.create({
  container: {
    margin: dimensions.indent * 0.2,
    width: (dimensions.width - dimensions.indentModerated * 3.2) / 3,
    height: (dimensions.width - dimensions.indentModerated * 8) / 3,
  },
  item: {
    borderColor: colors.addPhotoButton.borderColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIconContainer: {
    position: 'absolute',
    right: -4,
    top: -4,
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    zIndex: 1,
    backgroundColor: colors.photoItem.removeButtonBackground,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.7,
    elevation: 3,
  },
  image: {
    borderRadius: 10,
    width: (dimensions.width - dimensions.indentModerated * 3.2) / 3,
    height: (dimensions.width - dimensions.indentModerated * 8) / 3,
  },
});
