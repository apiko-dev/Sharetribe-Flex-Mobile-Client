import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import T from 'prop-types';
import {
  Text,
  Button,
  InputForm,
  Padlock,
  Loader,
} from '../../../../components';
import s from './styles';
import i18n from '../../../../i18n';

const ResetPasswordModal = ({
  isVisible,
  onChange,
  resetPasswordEmail,
  resetPassword,
  activeField,
  isLoading,
}) => (
  <Modal isVisible={isVisible}>
    <View style={s.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <View style={s.closeIconContainer}>
            {/* TODO: Change close text by icon */}
            <Text
              onPress={() =>
                onChange('isVisibleResetPasswordModal', false)
              }
            >
              Close
            </Text>
          </View>
          <Padlock />
          <Text bold xxmediumSize black style={s.heading}>
            {i18n.t('auth.resetPasswordHeading')}
          </Text>
          <Text style={s.text}>
            {i18n.t('auth.resetPasswordPreInstruction')}
          </Text>
          <InputForm
            containerStyle={s.inputContainer}
            placeholder={i18n.t('auth.email')}
            value={resetPasswordEmail}
            active={activeField === 'resetPasswordEmail'}
            onFocus={() =>
              onChange('activeField', 'resetPasswordEmail')
            }
            onChangeText={(value) =>
              onChange('resetPasswordEmail', value)
            }
          />
          <Button
            primary
            onPress={() => resetPassword()}
            containerStyle={s.buttonContainer}
          >
            {i18n.t('auth.sendResetEmail')}
          </Button>
        </>
      )}
    </View>
  </Modal>
);

ResetPasswordModal.propTypes = {
  isVisible: T.bool,
  onChange: T.func,
  resetPasswordEmail: T.string,
  resetPassword: T.func,
  activeField: T.string,
  isLoading: T.bool,
};

export default ResetPasswordModal;
