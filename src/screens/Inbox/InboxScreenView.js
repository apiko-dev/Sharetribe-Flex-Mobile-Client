import React from 'react';
import { View } from 'react-native';

import { Message } from './components';
import s from './styles';

function InboxScreen({ transactions }) {
  return (
    <View style={s.container}>
      {transactions.map((i) => (
        <Message transaction={i} />
      ))}
    </View>
  );
}

export default InboxScreen;
