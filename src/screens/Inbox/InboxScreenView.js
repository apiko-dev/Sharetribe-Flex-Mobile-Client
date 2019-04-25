import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';

import { Message } from './components';
import { DrawerButton } from '../../components';
import s from './styles';

function InboxScreen({ transactions }) {
  return (
    <View style={s.container}>
      {transactions.map((i) => (
        <Message transaction={i} key={i.id} />
      ))}
    </View>
  );
}

InboxScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton />,
});

InboxScreen.propTypes = {
  transactions: T.array,
};

export default InboxScreen;
