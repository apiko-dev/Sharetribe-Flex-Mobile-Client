import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../styles';
import { isSmallDevice } from '../../utils';

const isSmall = isSmallDevice();

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
    marginRight: isSmall ? 0 : dimensions.indent * 2,
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

export function styleConstructor(theme = {}) {
  const appStyle = { ...theme };
  return StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    base: {
      width: 34,
      height: 34,
      alignItems: 'center',
      paddingTop: 1,
    },
    fillers: {
      position: 'absolute',
      height: 34,
      flexDirection: 'row',
      left: 0,
      right: 0,
    },
    leftFiller: {
      height: 34,
      flex: 1,
    },
    rightFiller: {
      height: 34,
      flex: 1,
    },
    text: {
      marginTop: 7,
      fontSize: appStyle.textDayFontSize,
      fontFamily: appStyle.textDayFontFamily,
      fontWeight: '700',
      color: appStyle.dayTextColor,
    },
    today: {
      backgroundColor: appStyle.todayBackgroundColor,
    },
    todayText: {
      fontWeight: '700',
      color: theme.todayTextColor || appStyle.dayTextColor,
    },
    disabledText: {
      fontWeight: '700',
      color: appStyle.employedDayTextColor,
    },
    quickAction: {
      borderWidth: 1,
    },
    quickActionText: {
      marginTop: 6,
      color: appStyle.textColor,
    },
    firstQuickAction: {
      backgroundColor: appStyle.textLinkColor,
    },
    ...(theme['stylesheet.day.period'] || {}),
  });
}
