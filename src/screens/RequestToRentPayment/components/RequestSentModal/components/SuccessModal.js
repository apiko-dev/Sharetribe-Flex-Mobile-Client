import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { Text, Button, IconFonts } from '../../../../../components';
import s from '../styles';
import i18n from '../../../../../i18n';
import { colors } from '../../../../../styles';

const SuccessModal = ({ goToChat }) => (
  <View>
    <IconFonts
      style={s.icon}
      name="success"
      size={80}
      tintColor={colors.icon.tintColorOrange}
    />
    <Text bold largeSize black style={s.heading}>
      {i18n.t('requestToRent.requestSent')}
    </Text>
    <Text style={s.text}>
      {i18n.t('requestToRent.waitForConfirmation')}
    </Text>
    <Button
      style={s.button}
      primary
      onPress={() => goToChat()}
      containerStyle={s.buttonContainer}
      title={i18n.t('requestToRent.goToChat')}
    />
  </View>
);

SuccessModal.propTypes = {
  goToChat: T.func,
};

export default SuccessModal;
