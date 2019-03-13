import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { Text, Button, IconFonts } from '../../../../../components';
import s from '../styles';
import i18n from '../../../../../i18n';
import { colors } from '../../../../../styles';

const RootModal = ({ onCloseModal }) => (
  <View>
    <IconFonts
      style={s.icon}
      name="verified"
      size={80}
      tintColor={colors.icon.tintColorOrange}
    />
    <Text bold largeSize black style={s.heading}>
      {i18n.t('auth.emailSent')}
    </Text>
    <Text style={s.text}>
      {i18n.t('auth.resetPasswordPostInstruction')}
    </Text>
    <Button
      primary
      onPress={() => onCloseModal()}
      containerStyle={s.buttonResultContainer}
      title={i18n.t('auth.continue')}
    />
  </View>
);

RootModal.propTypes = {
  onCloseModal: T.func,
};

export default RootModal;
