import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';
import { Text, Touchable } from '../../../../../components';
import { NavigationService } from '../../../../../services';
import s from './styles';
import i18n from '../../../../../i18n';

function NavigateInfoBlock({ transaction }) {
  function navigateToChat() {
    NavigationService.navigateToChat({ transaction });
  }
  function navigateToGoods() {
    NavigationService.navigateToProduct({
      product: transaction.relationships.listing,
    });
  }

  const name = () => {
    const currentName = transaction.isViewer
      ? transaction.relationships.customer.profile.displayName
      : transaction.relationships.provider.profile.displayName;

    return (
      <Text xxsmallSize orange>
        {currentName}
      </Text>
    );
  };
  return (
    <View style={s.container}>
      <View style={s.nameContainer}>
        {transaction.isViewer ? (
          <Text>{i18n.t('rentals.renter')}</Text>
        ) : (
          <Text>{i18n.t('rentals.provider')}</Text>
        )}
        {name()}
      </View>
      <View style={s.navigateContainer}>
        <Touchable onPress={() => navigateToChat()}>
          <Text xxsmallSize orange>
            {i18n.t('rentals.viewChat')}
          </Text>
        </Touchable>
        <Touchable onPress={() => navigateToGoods()}>
          <Text xxsmallSize orange>
            {i18n.t('rentals.viewGoods')}
          </Text>
        </Touchable>
      </View>
    </View>
  );
}

NavigateInfoBlock.propTypes = {
  transaction: T.object,
};

export default NavigateInfoBlock;
