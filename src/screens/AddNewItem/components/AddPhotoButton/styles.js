import { StyleSheet, Dimensions } from 'react-native';
import { colors, dimensions } from '../../../../styles';

export default StyleSheet.create({
  container: {
    margin: dimensions.indent * 0.2,
    width:
      (Dimensions.get('window').width - dimensions.indent * 3.2) / 3,
  },
  button: {
    borderStyle: 'dashed',
    borderColor: colors.addPhotoButton.borderColor,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: (dimensions.width - dimensions.indent * 8) / 3,
  },
});
