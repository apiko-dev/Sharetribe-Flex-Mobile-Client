import { StyleSheet } from 'react-native';
import { dimensions } from '../../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: dimensions.indent * 2.8,
  },
  listContainer: {
    flex: 1,
  },
  flatListContentContainer: {
    paddingHorizontal: 0,
  },
});
