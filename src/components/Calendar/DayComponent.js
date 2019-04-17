import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import Text from '../Text/Text';

const DayComponentCalendar = ({ date, state, onPress }) => { // eslint-disable-line 
  return (
    <View>
      <Text xsmallSize>{date.day}</Text>
    </View>
  );
};

DayComponentCalendar.propTypes = {
  date: T.object,
  state: T.object,
};

export default DayComponentCalendar;
