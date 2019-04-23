import React from 'react';
import { View } from 'react-native';

import { Message } from './components';
import s from './styles';

const InboxScreen = ({ transactions }) => (
  <View style={s.container}>
    {transactions.map((i) => (
      <Message {...i} />
    ))}
  </View>
);

export default InboxScreen;
