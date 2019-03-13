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

const SignInFormView = ({
  jumpTo,
  email,
  password,
  onChange,
  activeField,
  isValidFields,
  signIn,
  isSigningIn,
}) => (
  <View style={s.container}>
    <Text style={s.heading} bold xxmediumSize>
      Sign In
    </Text>
    <View>
      <InputForm
        placeholder={i18n.t('auth.email')}
        containerStyle={s.inputContainerEmail}
        value={email}
        active={activeField === 'email'}
        onFocus={() => onChange('activeField', 'email')}
        onChangeText={(text) => onChange('email', text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <InputForm
        placeholder={i18n.t('auth.password')}
        containerStyle={s.inputContainerPassword}
        value={password}
        active={activeField === 'password'}
        onFocus={() => onChange('activeField', 'password')}
        onChangeText={(text) => onChange('password', text)}
        secureTextEntry
        autoCapitalize="none"
      />
    </View>
    <View style={s.textWithTouchableContainer}>
      <Text style={[s.text]} smallSize gray>
        {i18n.t('auth.resetPassword')}
      </Text>
      <TextTouchable
        smallSize
        onPress={() => onChange('isVisibleResetPasswordModal', true)}
      >
        {i18n.t('auth.resetPasswordLink')}
      </TextTouchable>
    </View>
    <Button
      primary
      containerStyle={s.buttonContainer}
      disabled={!isValidFields || isSigningIn}
      onPress={() => signIn()}
      isLoading={isSigningIn}
      title={i18n.t('auth.signIn')}
    />
    <Text style={[s.text]} gray>
      {i18n.t('auth.dontHaveAnAccount')}
    </Text>
    <View style={s.bottom}>
      <TextTouchable
        bold
        alignCenter
        onPress={() => jumpTo('signUp')}
      >
        {i18n.t('auth.signUp')}
      </TextTouchable>
    </View>
  </View>
);

SignInFormView.propTypes = {
  jumpTo: T.func,
  onChange: T.func.isRequired,
  email: T.string,
  password: T.string,
  activeField: T.string,
  isValidFields: T.bool,
  signIn: T.func,
  isSigningIn: T.bool,
};

export default SignInFormView;
