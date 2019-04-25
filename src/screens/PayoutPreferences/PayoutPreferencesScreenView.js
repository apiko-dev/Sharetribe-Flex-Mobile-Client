/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';
import s from './styles';
import {
  Text,
  FormContainer,
  Button,
  FormInput,
  Form,
  // SelectButton,
} from '../../components';
import i18n from '../../i18n';
import { PayoutSchema } from '../../validators/schemes';
import { countries } from '../../constants';

const PayoutPreferencesScreen = ({
  onSave,
  initialValues,
  isLoading,
  formRef,
  // goToCreditCardList,
  // cardNumber,
}) => (
  <SafeAreaView style={s.safeAreaViewContainer}>
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={30}
    >
      <View style={s.container}>
        <View style={s.oneMoreThings}>
          <Text xmediumSize bold style={s.header}>
            {i18n.t('payoutPreferences.oneMoreThing')}
          </Text>
          <Text>
            {i18n.t('payoutPreferences.oneMoreThingDescription')}
          </Text>
        </View>
        <Form
          enableReinitialize
          validationSchema={PayoutSchema}
          ref={formRef}
          initialValues={initialValues}
          isInitialValid={false}
          onSubmit={onSave}
        >
          {({ handleSubmit, isValid }) => (
            <React.Fragment>
              <FormContainer
                headerTitle={i18n.t(
                  'payoutPreferences.personalDetails',
                )}
              >
                <View style={[s.inputRowContainer, s.inputContainer]}>
                  <FormInput.Field
                    placeholder={i18n.t(
                      'payoutPreferences.firstName',
                    )}
                    containerStyle={s.inputLeft}
                    name="firstName"
                    maxLength={100}
                  />
                  <FormInput.Field
                    placeholder={i18n.t('payoutPreferences.lastName')}
                    containerStyle={s.inputRight}
                    name="lastName"
                    maxLength={100}
                  />
                </View>
                <View style={s.inputRowContainer}>
                  <FormInput.Field
                    placeholder={i18n.t(
                      'payoutPreferences.birthDate',
                    )}
                    containerStyle={s.inputLeft}
                    name="birthDate"
                    keyboardType="number-pad"
                    maxLength={2}
                    inputType="date"
                  />
                  <FormInput.Field
                    placeholder={i18n.t('payoutPreferences.month')}
                    containerStyle={s.inputLeft}
                    name="month"
                    keyboardType="number-pad"
                    maxLength={2}
                    inputType="month"
                  />
                  <FormInput.Field
                    placeholder={i18n.t('payoutPreferences.year')}
                    containerStyle={s.inputRight}
                    name="year"
                    keyboardType="number-pad"
                    maxLength={4}
                    inputType="year"
                  />
                </View>
              </FormContainer>

              <FormContainer
                headerTitle={i18n.t('payoutPreferences.address')}
              >
                <FormInput.FieldWithDropDown
                  placeholder={i18n.t('payoutPreferences.country')}
                  containerStyle={s.inputContainer}
                  name="country"
                  dropDownList={countries.stripeCountriesList}
                />

                <FormInput.Field
                  placeholder={i18n.t(
                    'payoutPreferences.streetAddress',
                  )}
                  containerStyle={s.inputContainer}
                  name="streetAddress"
                />
                <View style={s.inputRowContainer}>
                  <FormInput.Field
                    containerStyle={s.inputLeft}
                    placeholder={i18n.t(
                      'payoutPreferences.postalCode',
                    )}
                    name="postalCode"
                    autoCapitalize="none"
                    maxLength={100}
                    keyboardType="number-pad"
                  />
                  <FormInput.Field
                    containerStyle={s.inputRight}
                    placeholder={i18n.t('payoutPreferences.city')}
                    name="city"
                    maxLength={100}
                  />
                </View>
              </FormContainer>

              {/* <FormContainer
                headerTitle={i18n.t('payoutPreferences.payment')}
              >
                {!cardNumber ? (
                  <Button
                    title={`+ ${i18n.t('payoutPreferences.addCard')}`}
                    onPress={goToCreditCardList}
                  />
                ) : (
                  <SelectButton
                    value={cardNumber}
                    onPress={goToCreditCardList}
                  />
                )}
              </FormContainer> */}
              <FormContainer
                headerTitle={i18n.t('payoutPreferences.payment')}
              >
                <FormInput.Field
                  placeholder={i18n.t(
                    'payoutPreferences.accountNumber',
                  )}
                  name="accountNumber"
                  autoCapitalize="none"
                  maxLength={100}
                  keyboardType="number-pad"
                />
              </FormContainer>

              <Button
                containerStyle={s.buttonContainer}
                title={i18n.t('payoutPreferences.saveAndPublish')}
                primary
                onPress={handleSubmit}
                isLoading={isLoading}
                disabled={!isValid || isLoading}
              />
            </React.Fragment>
          )}
        </Form>
      </View>
    </KeyboardAwareScrollView>
  </SafeAreaView>
);

PayoutPreferencesScreen.navigationOptions = () => ({
  title: i18n.t('payoutPreferences.payoutPreferences'),
});

PayoutPreferencesScreen.propTypes = {
  onSave: T.func,
  isLoading: T.bool,
  initialValues: T.object,
  formRef: T.any,
  // goToCreditCardList: T.func,
  // cardNumber: T.string,
};

export default observer(PayoutPreferencesScreen);
