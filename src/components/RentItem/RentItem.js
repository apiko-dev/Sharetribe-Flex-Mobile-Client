import React from 'react';
import T from 'prop-types';
import R from 'ramda';
import { View, Image } from 'react-native';

import { observer } from 'mobx-react/custom';
import { Touchable } from '../index';
import Button from '../Button/Button';
import i18n from '../../i18n';
import Text from '../Text/Text';
import { formatedDate } from '../../utils/dates';
import s from './styles';

const messageImage = require('../../assets/png/message_image.png');

function RentItem({
  isShowDetails,
  transaction,
  isOpenedChat,
  navigationToRequestToRent,
  navigateToListing,
}) {
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
  const amount = R.pathOr(
    '',
    ['relationships', 'listing', 'price', 'amount'],
    transaction,
  );
  const totalAmount = R.pathOr(
    '',
    ['payinTotal', 'amount'],
    transaction,
  );
  const isViewerTransaction = transaction.isViewer;
  return (
    <View style={s.container}>
      <View style={s.containerMessage}>
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
          {!isOpenedChat && (
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
          )}
          {isOpenedChat && !isViewerTransaction && (
            <View style={s.actionsInChat}>
              <Button
                title={`${i18n.t('chat.requestToRent')}: `}
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
                  {i18n.t('chat.viewGoods')}
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
            <Text>{`$ ${amount}`}</Text>
          </View>
          <View style={s.rentPeriod}>
            <Text gray>{rentPeriod.rangeDate}</Text>
            <View style={s.quantityDay}>
              <Text>{totalAmount / amount}</Text>
              <Text>{` ${i18n.t('inbox.day')}`}</Text>
            </View>
          </View>
          <View style={s.totalPrice}>
            <Text bold xmediumSize>
              {i18n.t('rentItem.totalPrice')}
            </Text>
            <Text bold xmediumSize>
              {`$ ${totalAmount}`}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

RentItem.propTypes = {
  isShowDetails: T.bool,
  transaction: T.object,
  isOpenedChat: T.bool,
  navigationToRequestToRent: T.func,
  navigateToListing: T.func,
};

export default observer(RentItem);
