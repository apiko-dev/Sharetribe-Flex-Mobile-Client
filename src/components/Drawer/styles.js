import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.drawer.header,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: colors.drawer.backgroundColor,
  },
  header: {
    backgroundColor: colors.drawer.header,
  },
  logoHeader: {
    marginTop: dimensions.indent * 0.5,
    marginBottom: dimensions.indent * 0.5,
  },
  drawerMain: {
    flex: 1,
    justifyContent: 'space-between',
  },
  userContainer: {
    flexDirection: 'row',
    padding: dimensions.indent,
  },
  userProfileContainer: {
    padding: dimensions.indent,
    justifyContent: 'center',
  },
  addGoodsButtonContainer: {
    marginTop: dimensions.indent,
    marginLeft: dimensions.indent,
    marginRight: dimensions.indent,
    marginBottom: dimensions.indent * 1.5,
  },
  logoImageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  logoBackground: {
    resizeMode: 'cover',
    borderRadius: 70 / 2,
  },
  viewProfileButton: {
    paddingHorizontal: 0,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  viewProfileButtonText: {
    alignSelf: 'flex-start',
  },
});
