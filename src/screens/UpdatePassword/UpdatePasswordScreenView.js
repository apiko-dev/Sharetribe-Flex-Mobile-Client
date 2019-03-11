import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { Text, InputForm, Button } from '../../components';
import i18n from '../../i18n';
import s from './styles';

const UpdatePasswordScreenView = ({
  newPassword,
  replyPassword,
  onChange,
  activeField,
  isUpdating,
  isValidFields,
  updatePassword,
}) => (
  <View style={s.container}>
    <Text back largeSize bold style={s.heading}>
      {i18n.t('updatePassword.newPassword')}
    </Text>
    <Text back style={s.instructionContainer}>
      {i18n.t('updatePassword.newPasswordInstruction')}
    </Text>
    <View>
      <InputForm
        placeholder={i18n.t('updatePassword.newPassword')}
        containerStyle={s.inputContainer}
        value={newPassword}
        onFocus={() => onChange('activeField', 'newPassword')}
        onChangeText={(text) => onChange('newPassword', text)}
        active={activeField === 'newPassword'}
        secureTextEntry
        autoCapitalize="none"
      />
      <InputForm
        containerStyle={s.inputContainer}
        placeholder={i18n.t('updatePassword.retypeNewPassword')}
        value={replyPassword}
        onFocus={() => onChange('activeField', 'replyPassword')}
        onChangeText={(text) => onChange('replyPassword', text)}
        active={activeField === 'replyPassword'}
        secureTextEntry
        autoCapitalize="none"
      />
    </View>
    <Button
      disabled={!isValidFields || isUpdating}
      primary
      containerStyle={s.buttonContainer}
      onPress={() => updatePassword()}
    >
      {i18n.t('updatePassword.updatePassword')}
    </Button>
  </View>
);

UpdatePasswordScreenView.navigationOptions = () => ({
  title: i18n.t('updatePassword.updateYourPassword'),
});

UpdatePasswordScreenView.propTypes = {
  newPassword: T.string,
  replyPassword: T.string,
  onChange: T.func,
  activeField: T.string,
  isUpdating: T.bool,
  isValidFields: T.bool,
  updatePassword: T.func,
};

export default UpdatePasswordScreenView;
