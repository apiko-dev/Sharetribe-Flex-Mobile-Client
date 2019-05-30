import React from 'react';
import T from 'prop-types';
import R from 'ramda';
import { View, Image } from 'react-native';

import { observer } from 'mobx-react/custom';
import {
  Touchable,
  ShadowContainer,
  Text,
} from '../../../../../../components';
import i18n from '../../../../../../i18n';
import { formatedDate } from '../../../../../../utils/dates';
import s from './styles';
import { NavigationService } from '../../../../../../services';

const messageImage = require('../../../../../../assets/png/message_image.png');

function RentItem({ transaction }) {
  const totalAmount = R.pathOr(
    '',
    ['payinTotal', 'amount'],
    transaction,
  );
  const start = R.pathOr(
    '',
    ['relationships', 'booking', 'displayStart'],
    transaction,
  );
  const end = R.pathOr(
    '',
    ['relationships', 'booking', 'displayEnd'],
    transaction,
  );
  const rentPeriod = formatedDate({ start, end });

  return (
    <ShadowContainer>
      <Touchable
        style={s.container}
        onPress={() =>
          NavigationService.navigateToProduct({
            product: transaction.relationships.listing,
            rentPeriod,
          })
        }
      >
        <View style={s.image}>
          <Image
            style={s.image}
            source={{
              uri: R.pathOr(messageImage, ['imageUrl'], transaction),
            }}
          />
        </View>
        <View style={s.textContainer}>
          <View>
            <Text ellipsizeMode="tail" numberOfLines={1} gray>
              {R.pathOr(
                '',
                ['relationships', 'listing', 'description'],
                transaction,
              )}
            </Text>
          </View>

          <React.Fragment>
            <View style={s.dateContainer}>
              <Text xxsmallSize gray>
                {'Dat: '}
              </Text>
              <Text xxsmallSize bold>
                {rentPeriod.rangeDate}
              </Text>
            </View>
            <View style={s.totalPriceContainer}>
              <Text xxsmallSize gray>
                {`${i18n.t('rentItem.totalPrice')}: `}
              </Text>
              <Text xxsmallSize bold>
                {`$ ${totalAmount}`}
              </Text>
            </View>
          </React.Fragment>
        </View>
      </Touchable>
    </ShadowContainer>
  );
}

RentItem.propTypes = {
  transaction: T.object,
};

export default observer(RentItem);
