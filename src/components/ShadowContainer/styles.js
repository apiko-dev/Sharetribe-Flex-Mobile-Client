import { StyleSheet } from 'react-native';
import { theme, dimensions } from '../../styles';

const styles = StyleSheet.create({
  innerContainer: {
    overflow: 'hidden',
    width: '100%',
    marginBottom: -dimensions.indent,
    zIndex: 2,
  },
  container: {
    ...theme.cardShadow,
    marginBottom: dimensions.indent,
  },
});

export default styles;
