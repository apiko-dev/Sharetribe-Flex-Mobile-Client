import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import { isSmallDevice } from '../../utils';

const isSmall = isSmallDevice();

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.calendarScreen.backgroundColor,
  },
  calendarContainer: {
    paddingBottom: isSmall ? dimensions.indent * 3 : 0,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  safeAreaViewContainer: {
    flex: 1,
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
