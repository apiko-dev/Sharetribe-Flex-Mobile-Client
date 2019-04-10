import { StyleSheet } from 'react-native';
import { dimensions } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: dimensions.indent,
    alignItems: 'center',
    paddingTop: dimensions.indentModerated * 5.4,
  },
  heading: {
    textAlign: 'center',
    marginTop: dimensions.indent * 1.5,
    marginBottom: dimensions.indent * 1.5,
  },
  instructionContainer: {
    textAlign: 'center',
    marginBottom: dimensions.indent * 2.5,
  },
  button: {
    paddingHorizontal: dimensions.indent * 2.5,
  },
});
