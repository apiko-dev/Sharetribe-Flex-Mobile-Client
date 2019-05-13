import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';
import s from './styles';
import { Calendar, Text, Footer } from '../../components';
import i18n from '../../i18n';

const RequestToRentScreen = ({
  month,
  date,
  year,
  day,
  product,
  isOwner,
  onCall,
  navigationToRequestToRent,
  phoneNumber,
}) => (
  <SafeAreaView style={s.safeAreaViewContainer}>
    <ScrollView
      style={s.container}
      bounces={false}
      contentContainerStyle={s.contentContainer}
    >
      <View style={s.calendarContainer}>
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
        <Calendar
          disablePicker
          availableDates={product.getAvailableDates}
          employedDates={product.getEmployedDates}
        />
      </View>
      {!isOwner && (
        <View>
          <Footer
            phone={phoneNumber}
            onCall={onCall}
            navigationToRequestToRent={navigationToRequestToRent}
          />
        </View>
      )}
    </ScrollView>
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
  product: T.object,
  isOwner: T.bool,
  onCall: T.func,
  navigationToRequestToRent: T.func,
  phoneNumber: T.string,
};

export default observer(RequestToRentScreen);
