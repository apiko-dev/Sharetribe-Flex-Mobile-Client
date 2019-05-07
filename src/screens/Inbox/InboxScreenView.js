import React from 'react';
import { FlatList } from 'react-native';
import T from 'prop-types';

import { Message } from './components';
import { DrawerButton } from '../../components';
import s from './styles';

function InboxScreen({ transactions, fetchMoreTransactions }) {
  return (
    <FlatList
      data={transactions}
      style={s.container}
      renderItem={({ item }) => (
        <Message transaction={item} key={item.id} />
      )}
      keyExtractor={(item) => item.id}
      onEndReached={() => fetchMoreTransactions()}
    />
  );
}

InboxScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton />,
});

InboxScreen.propTypes = {
  transactions: T.array,
  fetchMoreTransactions: T.func,
};

export default InboxScreen;
