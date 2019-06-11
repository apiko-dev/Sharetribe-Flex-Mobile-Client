import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';
import {
  InputForm,
  Button,
  TextTouchable,
  Text,
  Form,
  FormContainer,
  FormInput,
} from '../../../../components';
import i18n from '../../../../i18n';
import { SignUpSchema } from '../../../../validators/schemes';

const SignUpForm = ({
  // email,
  // password,
  // firstName,
  // lastName,
  // onChange,
  // activeField,
  // isValidFields,
  signUp,
  isSigningUp,
  onChangeTabIndex,
  //
  formRef,
}) => (
  <View style={s.container}>
    <Text style={s.heading} xxmediumSize bold>
      {i18n.t('auth.signUp')}
    </Text>
    <View>
      <Form
        enableReinitialize
        validationSchema={SignUpSchema}
        ref={formRef}
        // onSubmit={(values, actions) => {
        //   debugger;
        //   signUp(values);
        // }}
        onSubmit={signUp}
      >
        {({ isValid }) => (
          <React.Fragment>
            <FormInput.Field
              placeholder={i18n.t('settings.email')}
              containerStyle={s.inputContainerEmail}
              name="email"
              autoCapitalize="none"
              keyboardType="email-address"
              maxLength={100}
            />

            <View style={s.inputContainerFirstAndLastNames}>
              <FormInput.Field
                placeholder={i18n.t('settings.firstName')}
                containerStyle={[s.inputContainer, s.inputLeft]}
                name="firstName"
                maxLength={100}
              />
              <FormInput.Field
                placeholder={i18n.t('settings.lastName')}
                containerStyle={s.inputContainer}
                name="lastName"
                maxLength={100}
              />
            </View>

            <FormInput.Field
              placeholder={i18n.t('settings.currentPassword')}
              containerStyle={s.inputContainerPassword}
              name="password"
              inputType="password"
              autoCapitalize="none"
            />
            <React.Fragment>
              <Button
                primary
                containerStyle={s.buttonContainer}
                disabled={!isValid}
                onPress={() => signUp()}
                isLoading={isSigningUp}
                title={i18n.t('auth.createAccount')}
              />
              <View
                style={[s.textWithTouchableContainer, s.alignCenter]}
              >
                <Text style={s.text} gray>
                  {i18n.t('auth.alreadyHaveAnAccount')}
                </Text>
                <TextTouchable
                  bold
                  onPress={() => onChangeTabIndex(0)}
                >
                  {i18n.t('auth.signIn')}
                </TextTouchable>
              </View>
            </React.Fragment>
          </React.Fragment>
        )}
      </Form>
    </View>
  </View>
);

SignUpForm.propTypes = {
  onChangeTabIndex: T.func,
  email: T.string,
  password: T.string,
  firstName: T.string,
  lastName: T.string,
  onChange: T.func.isRequired,
  activeField: T.string,
  isValidFields: T.bool,
  signUp: T.func,
  isSigningUp: T.bool,
};

export default SignUpForm;
