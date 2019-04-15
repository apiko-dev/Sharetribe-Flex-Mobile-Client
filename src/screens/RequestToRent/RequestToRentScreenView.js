import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';
import s from './styles';
import {
  DrawerButton,
  Text,
  FormContainer,
  Calendar,
  Button,
} from '../../components';
import i18n from '../../i18n';

const RequestToRentScreen = ({ onDayPress, price }) => (
  <SafeAreaView style={s.safeAreaViewContainer}>
    <ScrollView containerStyle={s.container}>
      <FormContainer
        headerTitle={i18n.t('requestToRent.when')}
        containerStyle={s.formContainer}
      >
        <Calendar onDayPress={onDayPress} />
      </FormContainer>
      <FormContainer
        containerStyle={s.formContainer}
        headerTitle={i18n.t('requestToRent.bookingBreakdown')}
      >
        <View style={s.label}>
          <Text gray>{i18n.t('requestToRent.priceADay')}</Text>
          <Text>{`$${price}`}</Text>
        </View>
        <View style={s.label}>
          <Text gray>10/12/2018-11/12/2018</Text>
          <Text>1 day</Text>
        </View>
        <View style={[s.label, s.totalPrice]}>
          <Text black xmediumSize>
            {i18n.t('requestToRent.totalPrice')}
          </Text>
          <Text black xmediumSize>
            $56
          </Text>
        </View>
      </FormContainer>
      <Button
        title={i18n.t('requestToRent.requestToRent')}
        primary
        containerStyle={s.buttonContainer}
      />
    </ScrollView>
  </SafeAreaView>
);

RequestToRentScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton />,
  title: i18n.t('requestToRent.requestToRent'),
});

RequestToRentScreen.propTypes = {
  onDayPress: T.func,
  price: T.any,
};

export default observer(RequestToRentScreen);
