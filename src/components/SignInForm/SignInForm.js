import React from 'react';
import { View, Text } from 'react-native';
import s from './styles';
import { Input, Touchable } from '..';

const SignInForm = () => (
  <View style={s.container}>
    <Text>Sign In</Text>
    <View>
      <Input title="Email" placeholder="Enter your email" />
      <Input
        title="Passwrod"
        placeholder="Enter your password"
        secureTextEntry
      />
    </View>
    <Touchable>
      <Text>Sign In</Text>
    </Touchable>
  </View>
);

export default SignInForm;
