import React from 'react';
import { View, Text } from 'react-native';
import T from 'prop-types';
import s from './styles';
import { InputForm, Button, TextTouchable } from '..';

const SignUpForm = ({
  jumpTo,
  emailSignUp,
  passwordSignUp,
  firstName,
  lastName,
  onChange,
  activeField,
}) => (
  <View style={s.container}>
    <Text style={s.heading}>Sign Up</Text>
    <View>
      {/* <Input
        title="Email"
        placeholder="Enter your email"
        containerStyle={s.signUpInputContainerEmail}
      />
      <View style={s.signUpInputContainerFirstAndLastNames}>
        <Input
          title="First name"
          placeholder="First name"
          containerStyle={[s.signUpInputContainer, s.singUpInputLeft]}
        />
        <Input
          title="Last name"
          placeholder="Last name"
          containerStyle={s.signUpInputContainer}
        />
      </View>
      <Input
        title="Password"
        placeholder="Enter your password"
        secureTextEntry
        containerStyle={s.signUpInputContainerPassword}
      /> */}
      <InputForm
        placeholder="Email"
        containerStyle={s.signUpInputContainerEmail}
        value={emailSignUp}
        active={activeField === 'emailSignUp'}
        onFocus={() => onChange('activeField', 'emailSignUp')}
        onChangeText={(text) => onChange('emailSignUp', text)}
      />
      <View style={s.signUpInputContainerFirstAndLastNames}>
        <InputForm
          placeholder="First name"
          containerStyle={[s.signUpInputContainer, s.singUpInputLeft]}
          value={firstName}
          active={activeField === 'firstName'}
          onFocus={() => onChange('activeField', 'firstName')}
          onChangeText={(text) => onChange('firstName', text)}
        />
        <InputForm
          placeholder="Last name"
          containerStyle={s.signUpInputContainer}
          value={lastName}
          active={activeField === 'lastName'}
          onFocus={() => onChange('activeField', 'lastName')}
          onChangeText={(text) => onChange('lastName', text)}
        />
      </View>
      <InputForm
        placeholder="Password"
        containerStyle={s.signUpInputContainerPassword}
        value={passwordSignUp}
        active={activeField === 'passwordSignUp'}
        onFocus={() => onChange('activeField', 'passwordSignUp')}
        onChangeText={(text) => onChange('passwordSignUp', text)}
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
    <View style={s.signUpButtonContainer}>
      <Button primary>Create account</Button>
    </View>
    <View style={[s.textWithTouchableContainer, s.alignCenter]}>
      <Text style={s.text}>Already have an account?</Text>
      <TextTouchable boldFontWeight onPress={jumpTo}>
        Sign in
      </TextTouchable>
    </View>
  </View>
);

SignUpForm.propTypes = {
  jumpTo: T.func,
  emailSignUp: T.string,
  passwordSignUp: T.string,
  firstName: T.string,
  lastName: T.string,
  onChange: T.func.isRequired,
  activeField: T.string,
};

export default SignUpForm;
