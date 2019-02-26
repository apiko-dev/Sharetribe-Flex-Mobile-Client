import React from 'react';
import { View, Text } from 'react-native';
import s from './styles';
import { Touchable } from '../../components';

const AuthScreen = ({
  singIn,
}) => (
  <View style={s.container}>
    <Text>Login Screen</Text>
    <Touchable onPress={singIn}>
      <Text>LOGIN</Text>
    </Touchable>
  </View>
);

export default AuthScreen;