import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import {
  Text,
  Button,
  InputForm,
  IconFonts,
} from '../../../../../components';
import s from '../styles';
import i18n from '../../../../../i18n';
import { colors } from '../../../../../styles';

const RootModal = ({
  onChange,
  email,
  resetPassword,
  activeField,
  isValidEmail,
}) => (
  <View>
    <IconFonts
      style={s.icon}
      name="padlock"
      size={80}
      tintColor={colors.icon.tintColorOrange}
    />
    <Text bold largeSize black style={s.heading}>
      {i18n.t('auth.resetPasswordHeading')}
    </Text>
    <Text style={s.text}>
      {i18n.t('auth.resetPasswordPreInstruction')}
    </Text>
    <InputForm
      containerStyle={s.inputContainer}
      placeholder={i18n.t('auth.email')}
      value={email}
      active={activeField === 'email'}
      onFocus={() => onChange('activeField', 'email')}
      onBlur={() => onChange('activeField', '')}
      onChangeText={(value) => onChange('email', value)}
      autoCapitalize="none"
      keyboardType="email-address"
    />
    <Button
      primary
      onPress={() => resetPassword()}
      containerStyle={s.buttonContainer}
      disabled={!isValidEmail}
      title={i18n.t('auth.sendResetEmail')}
    />
  </View>
);

RootModal.propTypes = {
  onChange: T.func,
  email: T.string,
  resetPassword: T.func,
  activeField: T.string,
  isValidEmail: T.bool,
};

export default RootModal;
