import React from 'react';
import T from 'prop-types';
import { FlatList } from 'react-native';
import { EmptyFlatList } from '../../../../components';
import RentItem from './components/RentItem/RentItem';
import i18n from '../../../../i18n';
import s from './styles';

function BorrowingView({ transactions, fetchMoreTransactions }) {
  return (
    <FlatList
      data={transactions}
      style={s.container}
      renderItem={({ item }) => (
        <RentItem transaction={item} key={item.id} />
      )}
      keyExtractor={(item) => item.id}
      onEndReached={() => fetchMoreTransactions()}
      contentContainerStyle={[
        transactions.length === 0 && s.emptyFlatList,
      ]}
      ListEmptyComponent={() => (
        <EmptyFlatList message={i18n.t('rentals.emptyList')} />
      )}
    />
  );
}

BorrowingView.propTypes = {
  transactions: T.object,
  fetchMoreTransactions: T.func,
};

export default BorrowingView;
