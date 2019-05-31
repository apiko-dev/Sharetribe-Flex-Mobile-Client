import React from 'react';
import T from 'prop-types';
import { FlatList } from 'react-native';

import { observer } from 'mobx-react/custom';
import { EmptyFlatList } from '../../../../components';
import RentalsItem from '../RentalsItem/RentalsItem';
import i18n from '../../../../i18n';
import s from './styles';

function LendingView({ lendingTransactions }) {
  return (
    <FlatList
      data={lendingTransactions}
      style={s.container}
      renderItem={({ item }) => (
        <RentalsItem transaction={item} key={item.id} />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[
        lendingTransactions.length === 0 && s.emptyFlatList,
      ]}
      ListEmptyComponent={() => (
        <EmptyFlatList message={i18n.t('rentals.emptyList')} />
      )}
    />
  );
}

LendingView.propTypes = {
  lendingTransactions: T.array,
};

export default observer(LendingView);
