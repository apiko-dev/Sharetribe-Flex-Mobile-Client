import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';

import { observer } from 'mobx-react/custom';
import { Text, ShadowContainer } from '../../../../components';

import i18n from '../../../../i18n';
import s from './styles';

function BorrowingView({
  totalEarnings,
  totalSpend,
  lendingRentals,
  borrowingRentals,
}) {
  return (
    <View style={s.container}>
      <ShadowContainer>
        <View style={s.cardContainer}>
          <Text bold xmediumSize>
            {i18n.t('rentals.statsBorrowing')}
          </Text>
          <View style={s.card}>
            <View style={s.columnContainer}>
              <Text mediumSize>{i18n.t('rentals.rentals')}</Text>
              <Text bold largeSize orange>
                {borrowingRentals}
              </Text>
            </View>
            <View style={s.columnContainer}>
              <Text mediumSize>{i18n.t('rentals.spend')}</Text>
              <Text bold largeSize orange>
                {`$ ${totalSpend(false)}`}
              </Text>
            </View>
          </View>
        </View>
      </ShadowContainer>
      <ShadowContainer>
        <View style={s.cardContainer}>
          <Text bold xmediumSize>
            {i18n.t('rentals.statsLending')}
          </Text>
          <View style={s.card}>
            <View style={s.columnContainer}>
              <Text mediumSize>{i18n.t('rentals.itemsListed')}</Text>
              <Text bold largeSize orange>
                {lendingRentals}
              </Text>
            </View>
            <View style={s.columnContainer}>
              <Text mediumSize>{i18n.t('rentals.earnings')}</Text>
              <Text bold largeSize orange>
                {`$ ${totalEarnings(true)}`}
              </Text>
            </View>
            <View style={s.columnContainer}>
              <Text mediumSize>{i18n.t('rentals.rentals')}</Text>
              <Text bold largeSize orange>
                {lendingRentals}
              </Text>
            </View>
          </View>
        </View>
      </ShadowContainer>
    </View>
  );
}

BorrowingView.propTypes = {
  totalEarnings: T.func,
  totalSpend: T.func,
  lendingRentals: T.number,
  borrowingRentals: T.number,
};

export default observer(BorrowingView);
