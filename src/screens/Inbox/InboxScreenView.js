import React from 'react';
import { FlatList } from 'react-native';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';

import i18n from '../../i18n';
import { Message } from './components';
import {
  DrawerButton,
  ScreenLoader,
  EmptyFlatList,
} from '../../components';
import s from './styles';

function InboxScreen({
  transactions,
  fetchMoreTransactions,
  isLoading,
}) {
  if (isLoading) {
    return <ScreenLoader />;
  }
  return (
    <FlatList
      data={transactions}
      style={s.container}
      renderItem={({ item }) => (
        <Message transaction={item} key={item.id} />
      )}
      keyExtractor={(item) => item.id}
      onEndReached={() => fetchMoreTransactions()}
      contentContainerStyle={[
        transactions.length === 0 && s.emptyFlatList,
      ]}
      ListEmptyComponent={() => (
        <EmptyFlatList message={i18n.t('home.emptyList')} />
      )}
    />
  );
}

InboxScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton />,
});

InboxScreen.propTypes = {
  transactions: T.array,
  fetchMoreTransactions: T.func,
  isLoading: T.bool,
};

export default observer(InboxScreen);
