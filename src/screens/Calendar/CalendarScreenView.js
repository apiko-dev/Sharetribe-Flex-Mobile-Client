import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';
import s from './styles';
import { Calendar, Text } from '../../components';
import i18n from '../../i18n';

const RequestToRentScreen = ({
  month,
  date,
  year,
  day,
  availableDates,
}) => (
  <SafeAreaView style={s.safeAreaViewContainer}>
    <View style={s.header}>
      <Text xmediumSize style={s.date}>
        <Text xmediumSize>
          {`${i18n.t('monthNames')[month]}, ${date}, ${year}`}
        </Text>
      </Text>
      <Text gray xxsmallSize style={s.day}>
        {i18n.t('dayNames')[day]}
      </Text>
    </View>
    <Calendar disablePicker availableDates={availableDates} />
  </SafeAreaView>
);

RequestToRentScreen.navigationOptions = () => ({
  title: i18n.t('common.calendar'),
});

RequestToRentScreen.propTypes = {
  month: T.number,
  date: T.number,
  year: T.number,
  day: T.number,
  availableDates: T.object,
};

export default observer(RequestToRentScreen);
