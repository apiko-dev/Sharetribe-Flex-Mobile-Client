import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../styles';

export default StyleSheet.create({
  calendarContainer: {},
  calendar: {},
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingTop: 0,
    borderBottomColor: colors.calendar.labelBorderColor,
    paddingHorizontal: dimensions.indent,
    paddingBottom: dimensions.indent,
    marginBottom: dimensions.indent * 0.8,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelRight: {
    marginRight: dimensions.indent * 2,
  },
  circle: {
    width: dimensions.indent,
    height: dimensions.indent,
    borderRadius: dimensions.indent / 2,
    marginRight: dimensions.indent / 2,
  },
  availableCircle: {
    backgroundColor: colors.calendar.availableDate,
  },
  employedCircle: {
    backgroundColor: colors.calendar.employedDate,
  },
  monthArrowRight: {
    marginRight: dimensions.indent * 3,
  },
  monthArrowLeft: {
    marginLeft: dimensions.indent * 3,
  },
});
