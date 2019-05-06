import React from 'react';
import { View, ScrollView } from 'react-native';
import T from 'prop-types';

import { FlatList } from 'react-native-gesture-handler';
import { Message } from './components';
import { DrawerButton } from '../../components';
import s from './styles';

function InboxScreen({ transactions }) {
  return (
    <ScrollView>
      <FlatList
        data={transactions}
        style={s.container}
        renderItem={({ item }) => (
          <Message transaction={item} key={item.id} />
        )}
        keyExtractor={(item) => item.id}
        // onEndReached={() => fetchMoreTransactions()}
      />
    </ScrollView>
  );
}

InboxScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton />,
});

InboxScreen.propTypes = {
  transactions: T.array,
};

export default InboxScreen;
