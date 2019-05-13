import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';
import { colors } from '../../styles';
import Text from '../Text/Text';
import IconFonts from '../IconFonts/IconFonts';
import i18n from '../../i18n';
import CalendarPicker from './CalendarPicker';
import { dates } from '../../utils';

const Calendar = ({
  getStartAndEndDate,
  disablePicker,
  availableDates,
  employedDates,
}) => (
  <View>
    <View style={s.labels}>
      <View style={s.label}>
        <View style={[s.circle, s.availableCircle]} />
        <Text green>{i18n.t('common.availableDate')}</Text>
      </View>
      <View style={[s.label, s.labelRight]}>
        <View style={[s.circle, s.employedCircle]} />
        <Text red>{i18n.t('common.employedDate')}</Text>
      </View>
    </View>
    <View style={s.calendarContainer}>
      <CalendarPicker
        disablePicker={disablePicker}
        style={s.calendar}
        minDate={new Date()}
        maxDate={dates.getEndDateByStart(new Date(), 90).end}
        onSuccess={(start, end, diffDays) =>
          getStartAndEndDate(start, end, diffDays)
        }
        theme={{
          markColor: colors.calendar.selectedDate,
          markTextColor: colors.calendar.selectedDateText,
          dayTextColor: colors.calendar.availableDate,
          employedDayTextColor: colors.calendar.employedDate,
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
        employedDate={employedDates}
        availableDates={availableDates}
      />
    </View>
  </View>
);

Calendar.propTypes = {
  getStartAndEndDate: T.func,
  disablePicker: T.bool,
  employedDates: T.array,
  availableDates: T.array,
};

export default Calendar;
