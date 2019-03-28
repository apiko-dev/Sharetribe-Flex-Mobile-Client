import { StyleSheet } from 'react-native';
import { dimensions } from '../../../../styles';
import { isSmallDevice } from '../../../../utils';

const isSmall = isSmallDevice();

export default StyleSheet.create({
  container: {
    marginBottom: dimensions.indent * 0.1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: dimensions.indent * 0.7,
    marginBottom: dimensions.indent * 0.4,
    paddingHorizontal: dimensions.indent * 1.2,
  },
  flatListContentContainer: {
    paddingHorizontal: isSmall ? 0 : dimensions.indent * 0.3,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  flatList: {
    width: dimensions.width,
  },
  emptyFlatList: {
    flex: 1,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
});
