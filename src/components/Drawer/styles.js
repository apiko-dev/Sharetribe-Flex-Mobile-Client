import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

export default StyleSheet.create({
  header: {
    paddingTop: dimensions.indent * 0.5,
    backgroundColor: colors.drawer.header,
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: dimensions.indent,
  },
  userProfileContainer: {
    padding: dimensions.indent,
  },
  addGoodsButtonContainer: {
    marginTop: dimensions.indent * 1.2,
    marginLeft: dimensions.indent,
    marginRight: dimensions.indent,
    marginBottom: dimensions.indent * 1.2,
  },
  // TODO: REMOVE IT
  tmpCircle: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: colors.authScreen.circle,
  },
});
