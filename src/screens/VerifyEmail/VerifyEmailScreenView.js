import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { HeaderBackButton } from '../../components';
import i18n from '../../i18n';
import s from './styles';
import { NavigationService } from '../../services';
import VerifyEmailSuccess from './components/VerifyEmailResult/VerifyEmailSuccess';
import VerifyEmailError from './components/VerifyEmailResult/VerifyEmailError';

const VerifyEmailScreenView = ({ goToApp, tryAgain, isError }) => {
  const verifyEmailContentComponent = () => {
    if (isError) {
      return (
        <VerifyEmailError goToApp={goToApp} tryAgain={tryAgain} />
      );
    }

    return <VerifyEmailSuccess goToApp={goToApp} />;
  };

  return (
    <View style={s.container}>{verifyEmailContentComponent()}</View>
  );
};

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
  tryAgain: T.func,
  isError: T.bool,
};

export default VerifyEmailScreenView;
