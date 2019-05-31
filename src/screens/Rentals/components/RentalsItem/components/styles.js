import { StyleSheet } from 'react-native';
import { dimensions } from '../../../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: dimensions.indent,
    marginTop: 0,
    justifyContent: 'space-between',
  },
  nameContainer: {
    flexDirection: 'row',
  },
  navigateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: dimensions.smallIndent / 3,
  },
});

export default styles;
