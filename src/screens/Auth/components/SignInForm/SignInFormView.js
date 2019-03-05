import React from 'react';
import { View, Text } from 'react-native';
import T from 'prop-types';
import s from './styles';
import {
  InputForm,
  Button,
  TextTouchable,
} from '../../../../components';

const SignInFormView = ({
  jumpTo,
  email,
  password,
  onChange,
  activeField,
  isValidFields,
}) => (
  <View style={s.container}>
    <Text style={s.heading}>Sign In</Text>
    <View>
      <InputForm
        placeholder="Email"
        containerStyle={s.inputContainerEmail}
        value={email}
        active={activeField === 'email'}
        onFocus={() => onChange('activeField', 'email')}
        onChangeText={(text) => onChange('email', text)}
      />
      <InputForm
        placeholder="Password"
        containerStyle={s.inputContainerPassword}
        value={password}
        active={activeField === 'password'}
        onFocus={() => onChange('activeField', 'password')}
        onChangeText={(text) => onChange('password', text)}
        secureTextEntry
      />
    </View>
    <View style={s.textWithTouchableContainer}>
      <Text style={[s.text, s.smallFontSize]}>
        Forgot your password?
      </Text>
      <TextTouchable smallFontSize>Reset password.</TextTouchable>
    </View>
    <Button
      primary
      containerStyle={s.buttonContainer}
      disable={!isValidFields}
    >
      Sign In
    </Button>
    <Text style={[s.text]}>Dont have an account?</Text>
    <View style={s.bottom}>
      <TextTouchable
        boldFontWeight
        alignCenter
        onPress={() => jumpTo('signUp')}
      >
        Sign Up
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
};

export default SignInFormView;
