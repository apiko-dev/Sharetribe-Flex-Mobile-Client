import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import CalendarPicker from 'react-native-calendar-picker';
// import { Calendar as CalendarPicker } from 'react-native-calendars';
import s from './styles';
import { colors } from '../../styles';
import Text from '../Text/Text';
import IconFonts from '../IconFonts/IconFonts';
import i18n from '../../i18n';
import DateRangePicker from './DateRangePicker';

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Calendar = ({ onDayPress, markedDates }) => (
  <View>
    <View style={s.labels}>
      <View style={s.label}>
        <View style={[s.circle, s.availableCircle]} />
        <Text green>{i18n.t('common.availableDate')}</Text>
      </View>
      <View style={s.label}>
        <View style={[s.circle, s.employedCircle]} />
        <Text red>{i18n.t('common.employedDate')}</Text>
      </View>
    </View>
    <View style={s.calendarContainer}>
      {/* <CalendarPicker
        onDayPress={onDayPress}
        renderArrow={(direction) => (
          <IconFonts
            name={direction}
            tintColor={colors.calendar.arrows}
            size={25}
            style={[
              direction === 'left' && s.monthArrowLeft,
              direction === 'right' && s.monthArrowRight,
            ]}
          />
        )}
        markedDates={{
          '2019-04-23': {
            selected: true,
            startingDay: true,
            color: colors.calendar.selectedDate,
            textColor: 'white',
          },
          '2019-04-24': {
            selected: true,
            color: colors.calendar.selectedDate,
            textColor: 'white',
          },
          '2019-04-25': {
            selected: true,
            color: colors.calendar.selectedDate,
            endingDay: true,
            textColor: 'white',
          },
        }}
        markingType="period"
      /> */}
      {/* <CalendarPicker
        allowRangeSelection
        minDate={new Date()}
        weekdays={weekdays}
        selectedDayColor={colors.calendar.selectedDate}
        selectedDayTextColor={colors.calendar.selectedDateText}
      /> */}
      <DateRangePicker
        initialRange={['2018-04-16', '2018-04-20']}
        onSuccess={(s, e) => console.log('s')}
        theme={{
          markColor: colors.calendar.selectedDate,
          markTextColor: colors.calendar.selectedDateText,
        }}
        renderArrow={(direction) => (
          <IconFonts
            name={direction}
            tintColor={colors.calendar.arrows}
            size={25}
            style={[
              direction === 'left' && s.monthArrowLeft,
              direction === 'right' && s.monthArrowRight,
            ]}
          />
        )}
      />
    </View>
  </View>
);

Calendar.propTypes = {
  onDayPress: T.func,
};

export default Calendar;
