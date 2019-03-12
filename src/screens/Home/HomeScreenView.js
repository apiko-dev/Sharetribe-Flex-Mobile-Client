import React from 'react';
import { View, Text } from 'react-native';
import T from 'prop-types';
import s from './styles';
import { DrawerButton } from '../../components';

const HomeScreen = ({ user }) => (
  <View style={s.container}>
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
