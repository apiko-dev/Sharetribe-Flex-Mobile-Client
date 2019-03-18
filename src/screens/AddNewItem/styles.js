import { StyleSheet } from 'react-native';
import { dimensions } from '../../styles';
import { isAndroid, isLargeDevice } from '../../utils';

const isAndroidDevice = isAndroid();
const isLarge = isLargeDevice();

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: dimensions.indent,
    paddingTop: dimensions.indent,
  },
  textPhotos: {
    marginBottom: dimensions.indent * 0.2,
  },
  inputContainer: {
    marginTop: dimensions.indent,
  },
  descriptionInputContainer: {
    height: dimensions.indent * 15,
    paddingTop: dimensions.indent * 0.5,
    paddingBottom: dimensions.indent * 0.5,
  },
  descriptionLabel: {
    position: 'absolute',
    top: isAndroidDevice
      ? dimensions.indent * 0.5
      : dimensions.indent * 0.6,
    paddingHorizontal: dimensions.indent * 0.2,
  },
  descriptionInput: {
    textAlignVertical: 'top',
    height: dimensions.indent * 14,
    paddingTop: dimensions.indent * 0.5,
    margin: 0,
  },
  buttonContainer: {
    marginTop: dimensions.indent * 1.3,
    marginBottom: isLarge
      ? dimensions.indent * 1.4
      : dimensions.indent,
    marginLeft: dimensions.indent,
    marginRight: dimensions.indent,
  },
  photos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
