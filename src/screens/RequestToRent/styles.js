import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import { isLargeDevice } from '../../utils';

const isLarge = isLargeDevice();

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.requestToRentScreen.backgroundColor,
  },
  safeAreaViewContainer: {
    backgroundColor: colors.settingsScreen.backgroundColor,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: dimensions.indent,
    paddingBottom: dimensions.indent * 1.1,
  },
  totalPrice: {
    borderTopWidth: 1,
    borderTopColor: colors.calendar.labelBorderColor,
    paddingTop: dimensions.indent * 1.1,
    paddingBottom: 0,
  },
  formContainer: {
    paddingHorizontal: 0,
  },
  buttonContainer: {
    marginTop: dimensions.indent * 1.3,
    marginBottom: isLarge
      ? dimensions.indent * 1.4
      : dimensions.indent,
    marginLeft: dimensions.indent * 2.2,
    marginRight: dimensions.indent * 2.2,
  },
});
