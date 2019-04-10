import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import {
  HeaderBackButton,
  Text,
  Button,
  IconFonts,
} from '../../components';
import i18n from '../../i18n';
import s from './styles';
import { colors } from '../../styles';
import { NavigationService } from '../../services';

const VerifyEmailScreenView = ({ isError, goToSettings }) => (
  <View style={s.container}>
    <IconFonts
      style={s.icon}
      name={isError ? 'error' : 'success'}
      size={80}
      tintColor={colors.icon.tintColorOrange}
    />
    <Text bold largeSize black style={s.heading}>
      {isError
        ? i18n.t('verifyEmail.verifyEmailError')
        : i18n.t('verifyEmail.verifyEmailSuccess')}
    </Text>
    <Text back xmediumSize style={s.instructionContainer}>
      {i18n.t('verifyEmail.someInstruction')}
    </Text>
    <Button
      primary
      buttonStyle={s.button}
      title={i18n.t('verifyEmail.goToSettings')}
      onPress={goToSettings}
    />
  </View>
);

VerifyEmailScreenView.navigationOptions = () => ({
  headerLeft: (
    <HeaderBackButton
      onPress={() => NavigationService.navigateToHome()}
    />
  ),
  title: i18n.t('verifyEmail.verifyEmail'),
});

VerifyEmailScreenView.propTypes = {
  goToSettings: T.func,
  isError: T.bool,
};

export default VerifyEmailScreenView;
