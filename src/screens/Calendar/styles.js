import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.calendarScreen.backgroundColor,
  },
  safeAreaViewContainer: {
    backgroundColor: colors.calendarScreen.backgroundColor,
  },
  header: {
    padding: dimensions.indent,
  },
  date: {
    marginBottom: dimensions.indent * 0.5,
  },
  day: {
    marginBottom: dimensions.indent * 0.6,
  },
});
