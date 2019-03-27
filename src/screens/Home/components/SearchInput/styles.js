import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';
import { isAndroid, isSmallDevice } from '../../../../utils';

const isAndroidDevice = isAndroid();
const isSmall = isSmallDevice();

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.searchInput.backgroundColor,
    borderRadius: 5,
    alignItems: 'center',
    width:
      (isSmall && dimensions.indent * 12.5) || dimensions.indent * 15,
  },
  input: {
    fontSize: 16,
    marginTop: isAndroidDevice ? 4 : 0,
    color: colors.searchInput.text,
    height: isAndroidDevice
      ? dimensions.indent * 2.4
      : dimensions.indent * 2,
    width: isAndroidDevice
      ? dimensions.indent * 10.5
      : (isSmall && dimensions.indent * 9) ||
        dimensions.indent * 11.5,
    paddingLeft: dimensions.indent * 0.1,
    paddingRight: dimensions.indent * 0.2,
  },
  icon: {
    paddingHorizontal: isAndroidDevice
      ? dimensions.indent * 0.4
      : dimensions.indent * 0.2,
  },
  iconSearch: {
    marginLeft: dimensions.indent * 0.1,
  },
});
