import { StyleSheet } from 'react-native';
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
    width: (dimensions.width - 2.9 * dimensions.indentModerated) / 3,
    marginTop: dimensions.indent * 0.4,
    marginBottom: dimensions.indent * 0.4,
    marginLeft: dimensions.indent * 0.15,
    marginRight: dimensions.indent * 0.15,
  },
  item: {
    paddingHorizontal: 0,
  },
});
