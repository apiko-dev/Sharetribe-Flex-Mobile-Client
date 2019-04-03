import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

const styles = StyleSheet.create({
  more: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.productScreen.white,
    margin: dimensions.indent / 2,
  },
  moreText: {
    backgroundColor: colors.textBackground,
  },
  innerContainer: {
    padding: 0,
    marginBottom: dimensions.indent,
  },
});

export default styles;
