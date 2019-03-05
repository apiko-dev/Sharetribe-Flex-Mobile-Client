import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import { fontSizes } from '../../styles';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 3,
    alignSelf: 'center',
  },
  text: {
    color: colors.textTouchable.textColor,
    fontSize: fontSizes.medium,
    alignSelf: 'center',
  },
  smallFontSize: {
    fontSize: fontSizes.small,
  },
  boldFontWeight: {
    fontWeight: '700',
  },
  alignCenter: {
    alignSelf: 'center',
  },
});
