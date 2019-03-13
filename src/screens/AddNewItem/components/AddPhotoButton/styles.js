import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';

export default StyleSheet.create({
  container: {
    margin: dimensions.indent * 0.2,
  },
  button: {
    borderStyle: 'dashed',
    borderColor: colors.addPhotoButton.borderColor,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: dimensions.indent * 0.5,
    paddingHorizontal: dimensions.indent * 1.4,
  },
});
