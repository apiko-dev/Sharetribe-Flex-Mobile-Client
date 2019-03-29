import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  flatListContentContainer: {
    paddingHorizontal: dimensions.indent * 0.3,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  flatListDefaultStyle: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.myListingsScreen.backgroundColor,
  },
  emptyFlatList: {
    flex: 1,
  },
  columnWrapperStyleDefaultStyle: {
    justifyContent: 'space-between',
  },
});
