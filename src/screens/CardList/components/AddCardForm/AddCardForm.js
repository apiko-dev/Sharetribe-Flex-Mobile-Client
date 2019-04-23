import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import {
  Button,
  Form,
  FormInput,
  FormContainer,
} from '../../../../components';
import s from './styles';
import i18n from '../../../../i18n';
import { PaymentSchema } from '../../../../validators/schemes';

const AddCardForm = ({ isLoading }) => (
  <Form validationSchema={PaymentSchema}>
    {({ handleSubmit, handleReset, isValid }) => (
      <View style={s.container}>
        <FormContainer headerStyle={s.formHeaderStyle}>
          <FormInput.Field
            containerStyle={s.inputContainer}
            placeholder={i18n.t('requestToRent.cardNumber')}
            name="cardNumber"
            iconNameLeft="card"
            keyboardType="number-pad"
            inputType="card-number"
          />
          <View style={s.inputContainerCardDadeAndCVC}>
            <FormInput.Field
              placeholder={i18n.t('requestToRent.cardExpiration')}
              containerStyle={s.inputLeft}
              name="cardExpiration"
              keyboardType="number-pad"
              inputType="card-expiration"
            />
            <FormInput.Field
              placeholder={i18n.t('requestToRent.cardCVC')}
              containerStyle={s.inputRight}
              name="cardCVC"
              keyboardType="number-pad"
              inputType="card-cvc"
              iconInInputPlaceholder="question"
              infoMessage={i18n.t('requestToRent.cardCVCInfo')}
            />
          </View>
          <View style={s.buttons}>
            <Button
              title={i18n.t('common.cancel')}
              onPress={handleReset}
              buttonStyle={s.button}
            />
            <Button
              primary
              title={i18n.t('payoutPreferences.addCard')}
              onPress={handleSubmit}
              disabled={!isValid || isLoading}
              isLoading={isLoading}
              containerStyle={s.buttonRight}
              buttonStyle={s.button}
            />
          </View>
        </FormContainer>
      </View>
    )}
  </Form>
);

AddCardForm.propTypes = {
  isLoading: T.bool,
};

export default AddCardForm;
