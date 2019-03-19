import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';
import {
  InputForm,
  Button,
  TextTouchable,
  Text,
} from '../../../../components';
import i18n from '../../../../i18n';

const SignUpForm = ({
  jumpTo,
  email,
  password,
  firstName,
  lastName,
  onChange,
  activeField,
  isValidFields,
  signUp,
  isSigningUp,
}) => (
  <View style={s.container}>
    <Text style={s.heading} xxmediumSize bold>
      {i18n.t('auth.signUp')}
    </Text>
    <View>
      <InputForm
        placeholder={i18n.t('auth.email')}
        containerStyle={s.inputContainerEmail}
        value={email}
        active={activeField === 'email'}
        onFocus={() => onChange('activeField', 'email')}
        onBlur={() => onChange('activeField', '')}
        onChangeText={(text) => onChange('email', text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View style={s.inputContainerFirstAndLastNames}>
        <InputForm
          placeholder={i18n.t('auth.firstName')}
          containerStyle={[s.inputContainer, s.inputLeft]}
          value={firstName}
          active={activeField === 'firstName'}
          onFocus={() => onChange('activeField', 'firstName')}
          onBlur={() => onChange('activeField', '')}
          onChangeText={(text) => onChange('firstName', text)}
        />
        <InputForm
          placeholder={i18n.t('auth.lastName')}
          containerStyle={s.inputContainer}
          value={lastName}
          active={activeField === 'lastName'}
          onFocus={() => onChange('activeField', 'lastName')}
          onBlur={() => onChange('activeField', '')}
          onChangeText={(text) => onChange('lastName', text)}
        />
      </View>
      <InputForm
        placeholder={i18n.t('auth.password')}
        containerStyle={s.inputContainerPassword}
        value={password}
        active={activeField === 'password'}
        onFocus={() => onChange('activeField', 'password')}
        onBlur={() => onChange('activeField', '')}
        onChangeText={(text) => onChange('password', text)}
        secureTextEntry
      />
    </View>
    <View style={[s.textWithTouchableContainer, s.alignCenter]}>
      <Text style={[s.text]} smallSize gray>
        {i18n.t('auth.termsAndConditions')}
      </Text>
      <TextTouchable smallSize>
        {i18n.t('auth.termsAndConditionsLink')}
      </TextTouchable>
    </View>
    <Button
      primary
      containerStyle={s.buttonContainer}
      disabled={!isValidFields || isSigningUp}
      onPress={() => signUp()}
      isLoading={isSigningUp}
      title={i18n.t('auth.createAccount')}
    />
    <View style={[s.textWithTouchableContainer, s.alignCenter]}>
      <Text style={s.text} gray>
        {i18n.t('auth.alreadyHaveAnAccount')}
      </Text>
      <TextTouchable bold onPress={() => jumpTo('signIn')}>
        {i18n.t('auth.signIn')}
      </TextTouchable>
    </View>
  </View>
);

SignUpForm.propTypes = {
  jumpTo: T.func,
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
