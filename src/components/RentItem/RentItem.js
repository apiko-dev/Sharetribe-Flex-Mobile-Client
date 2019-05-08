import React from 'react';
import T from 'prop-types';
import R from 'ramda';
import { View, Image } from 'react-native';

import { Touchable } from '../index';
import Button from '../Button/Button';
import i18n from '../../i18n';
import Text from '../Text/Text';
import s from './styles';

const messageImage = require('../../assets/png/message_image.png');

const RentItem = ({
  isShowDetails,
  transaction,
  isOpenedChat,
  navigationToRequestToRent,
  navigateToListing,
}) => (
  <View style={s.container}>
    <View style={s.containerMessage}>
      <View style={s.image}>
        <Image
          style={s.image}
          source={{
            uri: R.pathOr(
              messageImage,
              [
                'relationships',
                'listing',
                'relationships',
                'getImages',
                [0],
                'variants',
                'default',
                'url',
              ],
              transaction,
            ),
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
        {!isOpenedChat && (
          <React.Fragment>
            <View style={s.dateContainer}>
              <Text xxsmallSize gray>
                {'Dat: '}
              </Text>
              <Text xxsmallSize bold>
                08/12/2018 — 09/12/2018
              </Text>
            </View>
            <View style={s.totalPriceContainer}>
              <Text xxsmallSize gray>
                {'Total price: '}
              </Text>
              <Text xxsmallSize bold>
                $56
              </Text>
            </View>
          </React.Fragment>
        )}
        {isOpenedChat && (
          <View style={s.actionsInChat}>
            <Button
              title="Request to rent"
              primary
              containerStyle={s.buttonRentContainer}
              buttonStyle={s.buttonRent}
              onPress={navigationToRequestToRent}
            />
            <View style={s.viewGoods} />
            <Touchable
              orange
              xsmallSize
              onPress={navigateToListing}
              style={s.textNavigateToListing}
            >
              <Text xxsmallSize orange>
                View goods
              </Text>
            </Touchable>
          </View>
        )}
      </View>
    </View>
    {isShowDetails && (
      <View style={s.containerDetails}>
        <Text bold>{i18n.t('inbox.bookingBreakdown')}</Text>
        <View style={s.dayPrice}>
          <Text gray>{i18n.t('inbox.pricePerDay')}</Text>
          <Text>$56</Text>
        </View>
        <View style={s.rentPeriod}>
          <Text gray>10/12/2018 - 11/12/2018</Text>
          <Text>{i18n.t('inbox.day')}</Text>
        </View>
        <View style={s.totalPrice}>
          <Text bold xmediumSize>
            {i18n.t('inbox.totalPrice')}
          </Text>
          <Text bold xmediumSize>
            $56
          </Text>
        </View>
      </View>
    )}
  </View>
);

RentItem.propTypes = {};

export default RentItem;
