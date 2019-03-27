import { StyleSheet, Dimensions } from 'react-native';
import { dimensions } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionList: {
    alignSelf: 'stretch',
    paddingHorizontal: dimensions.indent,
  },
  sectionListContent: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  listItemContainer: {
    width:
      (Dimensions.get('window').width - 2.9 * dimensions.indent) / 3,
    marginTop: dimensions.indent * 0.4,
    marginBottom: dimensions.indent * 0.4,
    marginLeft: dimensions.indent * 0.15,
    marginRight: dimensions.indent * 0.15,
  },
  item: {
    paddingHorizontal: 0,
  },
});
