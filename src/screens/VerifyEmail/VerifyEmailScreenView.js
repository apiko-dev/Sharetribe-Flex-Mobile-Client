import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import {
  Text,
  IconFonts,
  Button,
  HeaderBackButton,
} from '../../components';
import i18n from '../../i18n';
import s from './styles';
import { NavigationService } from '../../services';
import { colors } from '../../styles';

const VerifyEmailScreenView = ({ goToApp }) => (
  <View style={s.container}>
    <IconFonts
      style={s.icon}
      name="success"
      size={80}
      tintColor={colors.icon.tintColorOrange}
    />
    <Text bold largeSize black style={s.heading}>
      {i18n.t('verifyEmail.verifyEmailSuccess')}
    </Text>
    <Text back style={s.instructionContainer}>
      {i18n.t('verifyEmail.someInstruction')}
    </Text>
    <Button
      primary
      containerStyle={s.buttonContainer}
      title={i18n.t('verifyEmail.goToApp')}
      onPress={goToApp}
    />
  </View>
);

VerifyEmailScreenView.navigationOptions = () => ({
  headerLeft: (
    <HeaderBackButton
      onPress={() => NavigationService.navigateToApp()}
    />
  ),
  title: i18n.t('verifyEmail.verifyEmail'),
});

VerifyEmailScreenView.propTypes = {
  goToApp: T.func,
};

export default VerifyEmailScreenView;
