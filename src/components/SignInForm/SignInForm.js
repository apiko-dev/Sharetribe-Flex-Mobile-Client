import React from 'react';
import { View, Text } from 'react-native';
import s from './styles';
import { Input, Button, TextTouchable } from '..';

const SignInForm = () => (
  <View style={s.container}>
    <Text style={s.heading}>Sign In</Text>
    <View>
      <Input title="Email" placeholder="Enter your email" />
      <Input
        title="Passwrod"
        placeholder="Enter your password"
        secureTextEntry
      />
    </View>
    <View>
      <Text style={[s.smallFontSize]}>Forgot your password?</Text>
      <TextTouchable smallFontSize>Reset password.</TextTouchable>
    </View>
    <Button primary>Sign In</Button>
    <View style={[s.textWithTouchable]}>
      <Text style={s.text}>Dont have an account?</Text>
      <TextTouchable boldFontWeight>Sign Up</TextTouchable>
    </View>
  </View>
);

export default SignInForm;
