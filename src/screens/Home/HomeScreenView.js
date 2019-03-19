import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';
import { DrawerButton, Switch, Text } from '../../components';
import i18n from '../../i18n';

const HomeScreen = ({ user }) => (
  <View style={s.container}>
    <View style={s.top}>
      <Text>{i18n.t('home.category')}</Text>
      <Switch />
    </View>
    <Text>Home Screen</Text>
    <Text>There is a token</Text>
    <Text>{user && user.firstName}</Text>
  </View>
);

HomeScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton />,
  title: 'Home',
});

HomeScreen.propTypes = {
  user: T.object.isRequired,
};

export default HomeScreen;
