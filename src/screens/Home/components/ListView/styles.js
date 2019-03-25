import { StyleSheet, Dimensions } from 'react-native';
import { dimensions } from '../../../../styles';
import { isSmallDevice } from '../../../../utils';

const isSmall = isSmallDevice();

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: dimensions.indent * 0.1,
  },
  sectionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: dimensions.indent * 0.7,
    marginBottom: dimensions.indent * 0.4,
    paddingHorizontal: dimensions.indent * 1.2,
  },
  listContainer: {
    flex: 1,
  },
  flatList: {
    paddingHorizontal: isSmall ? 0 : dimensions.indent,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  flatListContainer: {
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
