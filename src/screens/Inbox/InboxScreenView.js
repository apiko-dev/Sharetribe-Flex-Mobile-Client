/* eslint-disable react/jsx-wrap-multilines  */
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';

import i18n from '../../i18n';
import { Message } from './components';
import { DrawerButton, EmptyFlatList } from '../../components';
import s from './styles';
import { colors } from '../../styles';

function InboxScreen({
  transactions,
  fetchMoreTransactions,
  isRefreshing,
  firstFetchTransactions,
}) {
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
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={firstFetchTransactions}
          tintColor={colors.loader.secondary}
        />
      }
    />
  );
}

InboxScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton />,
  title: i18n.t('inbox.inbox'),
});

InboxScreen.propTypes = {
  transactions: T.array,
  fetchMoreTransactions: T.func,
  isRefreshing: T.bool,
  firstFetchTransactions: T.func,
};

export default observer(InboxScreen);
