import React from 'react';
import { View, Text } from 'react-native';
import s from './styles';

const HomeScreen = ({ store }) => (
  <View style={s.container}>
    <Text>Home Screen</Text>
    <Text>
      Hello
      {store.Auth.user.firstName}
    </Text>
  </View>
);

HomeScreen.navigationOptions = () => ({
  title: 'Home',
});

export default HomeScreen;
