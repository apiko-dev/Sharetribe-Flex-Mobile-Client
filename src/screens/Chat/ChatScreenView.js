import React from 'react';
import { View, Text } from 'react-native';

import { Conformation } from './components';

import s from './styles';

const ChatScreen = () => (
  <View style={s.container}>
    <Conformation />
  </View>
);

export default ChatScreen;
