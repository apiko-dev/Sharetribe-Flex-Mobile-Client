import { StyleSheet } from 'react-native';
import { dimensions } from '../../styles';

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
  },
  descriptionInput: {
    textAlignVertical: 'top',
    height: dimensions.indent * 15,
  },
  buttonContainer: {
    marginTop: dimensions.indent * 1.3,
    marginBottom: dimensions.indent,
    marginLeft: dimensions.indent,
    marginRight: dimensions.indent,
  },
  photos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
