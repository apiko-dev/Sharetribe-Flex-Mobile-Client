// import liraries
import React from 'react';
import { View } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';
import R from 'ramda';

import { Text } from '../../../../components';
import { colors } from '../../../../styles';

import s from './styles';

const WeekDay = ({ onSelectWeek, selectedWeekOptions, options }) => {
  return (
    <View style={s.availableDaysContainer}>
      <Text light style={s.availableDaysTitle}>
        Available days
      </Text>
      <SegmentedControls
        tint={colors.weekDay.white}
        separatorWidth={5}
        separatorTint={colors.weekDay.white}
        containerBorderWidth={0}
        selectedOption={selectedWeekOptions}
        testOptionEqual={(selectedValue, option) =>
          R.contains(option, selectedWeekOptions)
        }
        onSelection={(option) => onSelectWeek(option)}
        renderOption={(option, selected) => (
          <View
            style={[
              s.weekDayContainer,
              selected && s.selectedWeekDay,
            ]}
          >
            {selected ? (
              <Text light orange style={s.weekDayName}>
                {option.dayOfWeek}
              </Text>
            ) : (
              <Text light style={s.weekDayName}>
                {option.dayOfWeek}
              </Text>
            )}
          </View>
        )}
        options={options}
        allowFontScaling={false}
      />
    </View>
  );
};


export default WeekDay;
