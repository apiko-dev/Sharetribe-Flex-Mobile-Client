import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import { isLargeDevice } from '../../utils';

const isLarge = isLargeDevice();

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardListScreen.backgroundColor,
  },
  buttonContainer: {
    marginTop: dimensions.indent * 0.5,
    marginBottom: isLarge
      ? dimensions.indent * 1.4
      : dimensions.indent,
    marginLeft: dimensions.indent * 2.2,
    marginRight: dimensions.indent * 2.2,
  },
});
