import React from 'react';
import { View, Text } from 'react-native';
import T from 'prop-types';
import s from './styles';
import { InputForm, Button, TextTouchable } from '..';

const SignInForm = ({
  jumpTo,
  emailSignIn,
  passwordSignIn,
  onChange,
  activeField,
}) => (
  <View style={s.container}>
    <Text style={s.heading}>Sign In</Text>
    <View>
      <InputForm
        placeholder="Email"
        containerStyle={s.signInInputContainerEmail}
        value={emailSignIn}
        active={activeField === 'emailSignIn'}
        onFocus={() => onChange('activeField', 'emailSignIn')}
        onChangeText={(text) => onChange('emailSignIn', text)}
      />
      {/*       <Input
        title="Email"
        placeholder="Enter your email"
        containerStyle={s.signInInputContainerEmail}
      /> */}
      {/* <Input
        title="Password"
        placeholder="Enter your password"
        secureTextEntry
        containerStyle={s.signInInputContainerPassword}
      /> */}
      <InputForm
        placeholder="Password"
        containerStyle={s.signInInputContainerPassword}
        value={passwordSignIn}
        active={activeField === 'passwordSignIn'}
        onFocus={() => onChange('activeField', 'passwordSignIn')}
        onChangeText={(text) => onChange('passwordSignIn', text)}
        secureTextEntry
      />
    </View>
    <View style={s.textWithTouchableContainer}>
      <Text style={[s.text, s.smallFontSize]}>
        Forgot your password?
      </Text>
      <TextTouchable smallFontSize>Reset password.</TextTouchable>
    </View>
    <View style={s.signInButtonContainer}>
      <Button primary>Sign In</Button>
    </View>
    <Text style={[s.text]}>Dont have an account?</Text>
    <View style={s.bottom}>
      <TextTouchable boldFontWeight alignCenter onPress={jumpTo}>
        Sign Up
      </TextTouchable>
    </View>
  </View>
);

SignInForm.propTypes = {
  jumpTo: T.func,
  onChange: T.func.isRequired,
  emailSignIn: T.string,
  passwordSignIn: T.string,
  activeField: T.string,
};

export default SignInForm;
