import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import s from './styles';
import {
  FormContainer,
  Button,
  FormInput,
  Form,
} from '../../components';
import i18n from '../../i18n';
import { PaymentSchema } from '../../validators/schemes';

const RequestToRentPaymentScreen = ({
  onRequest,
  isInitializationTransaction,
}) => (
  <SafeAreaView style={s.safeAreaViewContainer}>
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={30}
      containerStyle={s.container}
    >
      <Form
        enableReinitialize
        validationSchema={PaymentSchema}
        onSubmit={onRequest}
      >
        {({ handleSubmit, isValid }) => (
          <View style={s.container}>
            <FormContainer
              headerTitle={i18n.t('requestToRent.payment')}
            >
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
            </FormContainer>

            <FormContainer
              headerTitle={i18n.t('requestToRent.message')}
            >
              <FormInput.Field
                inputContainerStyle={s.messageInputContainer}
                labelStyle={s.messageLabel}
                inputStyle={s.messageInput}
                placeholder={i18n.t('requestToRent.message')}
                name="message"
                multiline
                maxLength={1200}
              />
            </FormContainer>

            <Button
              title={i18n.t('requestToRent.sendRequest')}
              primary
              containerStyle={s.buttonContainer}
              disabled={!isValid || isInitializationTransaction}
              isLoading={isInitializationTransaction}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Form>
    </KeyboardAwareScrollView>
  </SafeAreaView>
);

RequestToRentPaymentScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('productName', 'Product'),
});

RequestToRentPaymentScreen.propTypes = {
  onRequest: T.func,
  isInitializationTransaction: T.bool,
};

export default observer(RequestToRentPaymentScreen);
