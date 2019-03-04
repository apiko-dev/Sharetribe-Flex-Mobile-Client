import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 3,
  },
  text: {
    color: colors.textTouchable.textColor,
    fontSize: 14,
    alignSelf: 'center',
  },
  smallFontSize: {
    fontSize: 12,
  },
  boldFontWeight: {
    fontWeight: '700',
  },
  alignCenter: {
    alignSelf: 'center',
  },
});
