import React from 'react';
import { View, Text } from 'react-native';
import s from './styles';
import { Input, Touchable } from '..';

const SignUpForm = () => (
  <View style={s.container}>
    <Text>Sign Up</Text>
    <View>
      <Input title="Email" placeholder="Enter your email" />
      <Input title="First name" placeholder="First name" />
      <Input title="Last name" placeholder="Last name" />
      <Input
        title="Passwrod"
        placeholder="Enter your password"
        secureTextEntry
      />
    </View>
    <View>
      <Text>By signing up you accept the terms and conditions</Text>
    </View>
    <Touchable>
      <Text>Create account</Text>
    </Touchable>
    <View>
      <Text>Already have an account? Sign in</Text>
    </View>
  </View>
);

export default SignUpForm;
