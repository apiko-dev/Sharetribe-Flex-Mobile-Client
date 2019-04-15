import { StyleSheet } from 'react-native';
import { dimensions } from '../../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  listContainer: {
    flex: 1,
  },
  flatListContentContainer: {
    paddingHorizontal: 0,
  },
  list: {
    paddingBottom: dimensions.indentModerated * 1.9,
  },
});
