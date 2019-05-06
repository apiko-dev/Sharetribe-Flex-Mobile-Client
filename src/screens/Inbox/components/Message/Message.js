import React from 'react';
import T from 'prop-types';
import { View, Image } from 'react-native';
import {
  getEndDateByStart,
  formatedDate,
  getHourAndMinutes,
} from '../../../../utils/dates';

import s from './styles';
import {
  Text,
  Touchable,
  ShadowContainer,
} from '../../../../components';
import { NavigationService } from '../../../../services';
import i18n from '../../../../i18n';

// const messageImage = require('../../../../assets/png/message_image.png');

function Message({ transaction }) {
  // const dat = transaction.createdAt;
  // const messageImage =
  //   transaction.relationships.listing.relationships.images[0].variants
  //     .url;
  // const dt = transaction.createdAt;
  // const createdTime = `${dt.getHours()}:${dt.getMinutes()}`;

  // const namePath =
  //   transaction.relationships.listing.relationships.author.profile;
  // const userName = `${namePath.firstName} ${namePath.lastName}`;

  // function getNormalizeDate(date) {
  //   // const month = date.getUTCMonth() + 1; // months from 1-12
  //   // const day = date.getUTCDate();
  //   // const year = date.getUTCFullYear();
  //   // return `${year}/${month}/${day}`;
  //   return date.toLocaleString().split(',')[0];
  // }

  // const booking = transaction.relationships.booking.attributes;
  // function stateProduct(props) {
  //   if (props.state === 'accepted') {
  //     return i18n.t('inbox.accepted');
  //   }
  //   return i18n.t('inbox.request');
  // }

  // const timeBooking = `${getNormalizeDate(
  //   booking.start,
  // )} - ${getNormalizeDate(booking.end)}`;

  const isRent =
    transaction.lastTransition.substring(11) === 'enquire' ? (
      <Text orange style={s.request} bold xxsmallSize>
        {i18n.t('inbox.request')}
      </Text>
    ) : (
      <Text green style={s.request} bold xxsmallSize>
        {i18n.t('inbox.accepted')}
      </Text>
    );
  const createdTime = getHourAndMinutes(
    transaction.lastTransitionedAt,
  );
  return (
    <ShadowContainer>
      <Touchable
        style={s.container}
        onPress={() =>
          NavigationService.navigateTo('Chat', { transaction })
        }
      >
        <View style={s.photoContainer}>
          <Image
            source={{
              uri:
                transaction.relationships.listing.relationships
                  .getImages[0].variants.default.url,
            }}
            style={s.image}
          />
          <View style={s.requestContainer}>
            {isRent}
          </View>
        </View>
        <View style={s.messageMainInfo}>
          <View style={s.headerMessage}>
            <Text bold>
              {
                transaction.relationships.listing.relationships.author
                  .profile.displayName
              }
            </Text>
            <Text lightGray xsmallSize>
              {createdTime}
            </Text>
          </View>
          <View style={s.text}>
            <Text ellipsizeMode="tail" numberOfLines={1} gray>
              {transaction.relationships.listing.description}
            </Text>
          </View>
          <View style={s.rentInfo}>
            {/* <Text xxsmallSize>{timeBooking}</Text> */}
          </View>
        </View>
      </Touchable>
    </ShadowContainer>
  );
}

Message.propTypes = {};

export default Message;
