// import liraries
import React from 'react';
import { View } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';
import T from 'prop-types';

import { Text } from '../../../../components';
import { colors } from '../../../../styles';
import { dayOfWeek } from '../../../../constants';
import s from './styles';

const WeekDay = ({ entries, setEntries }) => {
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
        selectedOption={entries}
        testOptionEqual={(selectedArray, currentOption) =>
          !!selectedArray.find((i) => i.key === currentOption.key)
        }
        onSelection={(option) => setEntries(option)}
        renderOption={(option, selected) => (
          <View
            style={[
              s.weekDayContainer,
              selected && s.selectedWeekDay,
            ]}
          >
            {selected ? (
              <Text light orange style={s.weekDayName}>
                {option.title}
              </Text>
            ) : (
              <Text light style={s.weekDayName}>
                {option.title}
              </Text>
            )}
          </View>
        )}
        options={dayOfWeek}
        allowFontScaling={false}
      />
    </View>
  );
};

WeekDay.propTypes = {
  entries: T.array,
  setEntries: T.func,
};

export default WeekDay;
