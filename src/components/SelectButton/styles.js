import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import { isAndroid } from '../../utils';

const isAndroidDevice = isAndroid();

export default StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: dimensions.indent * 0.8,
  },
  view: {
    flexDirection: 'row',
    backgroundColor: colors.button.backgroundColor,
    borderColor: colors.button.borderColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelOnTop: {
    position: 'absolute',
    left: dimensions.indent * 0.7,
    top: isAndroidDevice
      ? -dimensions.indent * 0.3
      : -dimensions.indent * 0.4,
    color: colors.input.labelColor,
    backgroundColor: colors.input.labelBackgroundColor,
    paddingHorizontal: dimensions.indent * 0.2,
  },
  disable: {
    backgroundColor: colors.button.disableColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
});
