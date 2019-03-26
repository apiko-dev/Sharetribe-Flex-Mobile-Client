import { StyleSheet, Dimensions } from 'react-native';
import { dimensions } from '../../styles';
import { isSmallDevice } from '../../utils';

const isSmall = isSmallDevice();

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContentContainer: {
    paddingHorizontal: isSmall ? 0 : dimensions.indent,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  flatList: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  emptyFlatList: {
    flex: 1,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
});
