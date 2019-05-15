import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { Text, Button, IconFonts } from '../../../../../components';
import s from '../styles';
import i18n from '../../../../../i18n';
import { colors } from '../../../../../styles';

const RootModal = ({ navigationToRequestToRent }) => (
  <View style={s.contentContainer}>
    <IconFonts
      style={s.icon}
      name="error"
      size={80}
      tintColor={colors.icon.tintColorOrange}
    />
    <Text bold xxmediumSize black style={s.heading}>
      {i18n.t('requestToRent.somethingWentWrong')}
    </Text>
    <Text style={s.text}>
      {i18n.t('requestToRent.requestErrorInstruction')}
    </Text>
    <Button
      primary
      onPress={() => navigationToRequestToRent()}
      containerStyle={s.buttonResultContainer}
      title={i18n.t('requestToRent.tryAgain')}
    />
  </View>
);

RootModal.propTypes = {
  navigationToRequestToRent: T.func,
};

export default RootModal;
