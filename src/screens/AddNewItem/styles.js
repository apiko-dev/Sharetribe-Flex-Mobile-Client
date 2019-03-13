import { StyleSheet } from 'react-native';
import { dimensions } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: dimensions.indent,
    paddingTop: dimensions.indent,
  },
  inputContainer: {
    marginTop: dimensions.indent,
  },
  descriptionInputContainer: {
    minHeight: dimensions.indent * 15,
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
