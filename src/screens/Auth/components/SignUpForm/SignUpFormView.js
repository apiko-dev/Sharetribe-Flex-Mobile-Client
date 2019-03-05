import React from 'react';
import { View, Text } from 'react-native';
import T from 'prop-types';
import s from './styles';
import {
  InputForm,
  Button,
  TextTouchable,
} from '../../../../components';

const SignUpForm = ({
  jumpTo,
  email,
  password,
  firstName,
  lastName,
  onChange,
  activeField,
  isValidFields,
}) => (
  <View style={s.container}>
    <Text style={s.heading}>Sign Up</Text>
    <View>
      <InputForm
        placeholder="Email"
        containerStyle={s.inputContainerEmail}
        value={email}
        active={activeField === 'email'}
        onFocus={() => onChange('activeField', 'email')}
        onChangeText={(text) => onChange('email', text)}
      />
      <View style={s.inputContainerFirstAndLastNames}>
        <InputForm
          placeholder="First name"
          containerStyle={[s.inputContainer, s.inputLeft]}
          value={firstName}
          active={activeField === 'firstName'}
          onFocus={() => onChange('activeField', 'firstName')}
          onChangeText={(text) => onChange('firstName', text)}
        />
        <InputForm
          placeholder="Last name"
          containerStyle={s.inputContainer}
          value={lastName}
          active={activeField === 'lastName'}
          onFocus={() => onChange('activeField', 'lastName')}
          onChangeText={(text) => onChange('lastName', text)}
        />
      </View>
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
    <View style={[s.textWithTouchableContainer, s.alignCenter]}>
      <Text style={[s.text, s.smallFontSize]}>
        By signing up you accept the
      </Text>
      <TextTouchable smallFontSize>
        terms and conditions
      </TextTouchable>
    </View>
    <Button
      primary
      containerStyle={s.buttonContainer}
      disable={!isValidFields}
    >
      Create account
    </Button>
    <View style={[s.textWithTouchableContainer, s.alignCenter]}>
      <Text style={s.text}>Already have an account?</Text>
      <TextTouchable boldFontWeight onPress={() => jumpTo('signIn')}>
        Sign in
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
};

export default SignUpForm;
