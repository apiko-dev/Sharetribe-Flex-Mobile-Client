import { StyleSheet, Dimensions } from 'react-native';
import { dimensions } from '../../styles';
import { isLargeDevice } from '../../utils';

const isLarge = isLargeDevice();

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    marginTop: dimensions.indent,
    marginBottom: dimensions.indent * 0.5,
    marginLeft: dimensions.indent * 1.3,
  },
  buttonContainer: {
    marginTop: dimensions.indent * 1.3,
    marginBottom: isLarge
      ? dimensions.indent * 1.4
      : dimensions.indent,
    marginLeft: dimensions.indent * 5,
    marginRight: dimensions.indent * 5,
  },
  button: {
    width: dimensions.indent * 10,
  },
});
