import React from 'react';
import { View, Text } from 'react-native';

import { Message } from './components';
import s from './styles';

const InboxScreen = () => (
  <View style={s.container}>
    <Message />
    <Message />
    <Message />
  </View>
);

export default InboxScreen;
