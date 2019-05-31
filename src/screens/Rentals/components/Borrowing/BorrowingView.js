import React from 'react';
import T from 'prop-types';
import { FlatList } from 'react-native';

import { observer } from 'mobx-react/custom';
import { EmptyFlatList } from '../../../../components';
import RentalsItem from '../RentalsItem/RentalsItem';
import i18n from '../../../../i18n';
import s from './styles';

function BorrowingView({ borrowingTransactions }) {
  return (
    <FlatList
      data={borrowingTransactions}
      style={s.container}
      renderItem={({ item }) => (
        <RentalsItem transaction={item} key={item.id} />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[
        borrowingTransactions.length === 0 && s.emptyFlatList,
      ]}
      ListEmptyComponent={() => (
        <EmptyFlatList message={i18n.t('rentals.emptyList')} />
      )}
    />
  );
}

BorrowingView.propTypes = {
  borrowingTransactions: T.array,
};

export default observer(BorrowingView);
