import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

export default StyleSheet.create({
  weekDayContainer: {
    flex: 1,
    backgroundColor: colors.weekDay.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.weekDay.borderColor,
    padding: dimensions.indent / 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: dimensions.indent * 2.5,
    height: dimensions.indent * 2.5,
  },
  selectedWeekDay: {
    borderColor: colors.weekDay.primary,
  },
  availableDaysTitle: {
    paddingTop: dimensions.indent,
    paddingBottom: dimensions.indent * 0.25,
  },
});
