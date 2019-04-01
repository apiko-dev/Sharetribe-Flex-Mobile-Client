import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';
import { DrawerButton, Text, InputForm } from '../../components';
import i18n from '../../i18n';

const SettingsScreen = () => (
  <View style={s.container}>
    <Text>Settings</Text>
  </View>
);

SettingsScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton />,
  title: i18n.t('settings.settings'),
});

SettingsScreen.propTypes = {};

export default SettingsScreen;
