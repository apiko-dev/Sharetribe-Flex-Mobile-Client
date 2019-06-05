import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.rentalsScreen.backgroundColor,
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.inbox.backgroundColor,
    marginBottom: dimensions.smallIndent / 2,
  },
  emptyFlatList: {
    flex: 1,
  },
});

export default styles;
