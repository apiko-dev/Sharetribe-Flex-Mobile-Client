import { StyleSheet } from 'react-native';
import { dimensions } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: dimensions.indent,
    alignItems: 'center',
    paddingTop: dimensions.indentModerated * 5,
  },
  heading: {
    textAlign: 'center',
    marginTop: dimensions.indent * 3.3,
    marginBottom: dimensions.indent * 0.8,
  },
  instructionContainer: {
    textAlign: 'center',
    marginBottom: dimensions.indent * 2,
  },
  buttonContainer: {
    marginTop: dimensions.indent * 1.4,
  },
});
