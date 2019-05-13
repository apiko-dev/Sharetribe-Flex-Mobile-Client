import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';
import s from './styles';
import {
  Text,
  FormContainer,
  Calendar,
  Button,
} from '../../components';
import i18n from '../../i18n';

const RequestToRentScreen = ({
  getStartAndEndDate,
  price,
  startRent,
  diffDays,
  product,
  formatedDate,
  goToRequestToRentPayment,
}) => (
  <SafeAreaView style={s.safeAreaViewContainer}>
    <ScrollView containerStyle={s.container}>
      <FormContainer
        headerTitle={i18n.t('requestToRent.when')}
        containerStyle={s.formContainer}
      >
        <Calendar
          getStartAndEndDate={getStartAndEndDate}
          availableDates={product.getAvailableDates}
          employedDates={product.getEmployedDates}
        />
      </FormContainer>
      <FormContainer
        containerStyle={s.formContainer}
        headerTitle={i18n.t('requestToRent.bookingBreakdown')}
      >
        <View style={s.label}>
          <Text gray>{i18n.t('requestToRent.priceADay')}</Text>
          <Text>{`$${price}`}</Text>
        </View>
        {!!startRent && (
          <View style={s.label}>
            <Text gray>{formatedDate}</Text>
            <Text>{`${diffDays} ${i18n.t('common.day')}`}</Text>
          </View>
        )}
        <View style={[s.label, s.totalPrice]}>
          <Text black xmediumSize>
            {i18n.t('requestToRent.totalPrice')}
          </Text>
          {!!diffDays && (
            <Text black xmediumSize>
              {`$ ${diffDays * price}`}
            </Text>
          )}
        </View>
      </FormContainer>
      <Button
        title={i18n.t('requestToRent.requestToRent')}
        primary
        containerStyle={s.buttonContainer}
        disabled={!startRent}
        onPress={goToRequestToRentPayment}
      />
    </ScrollView>
  </SafeAreaView>
);

RequestToRentScreen.navigationOptions = () => ({
  title: i18n.t('requestToRent.requestToRent'),
});

RequestToRentScreen.propTypes = {
  getStartAndEndDate: T.func,
  goToRequestToRentPayment: T.func,
  price: T.number,
  startRent: T.string,
  formatedDate: T.string,
  diffDays: T.number,
  product: T.object,
};

export default observer(RequestToRentScreen);
