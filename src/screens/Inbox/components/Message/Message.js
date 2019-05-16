import React from 'react';
import T from 'prop-types';
import { View, Image } from 'react-native';
import R from 'ramda';
import { observer } from 'mobx-react/custom';

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
import {
  transitionStatuses,
  transitionName,
} from '../../../../constants';

const messageImage = require('../../../../assets/png/message_image.png');

const getRentProps = (value) => {
  switch (value) {
    case transitionStatuses.ENQUIRE:
      return {
        gray: true,
        children: i18n.t('inbox.chat'),
      };
    case transitionStatuses.REQUEST:
      return {
        orange: true,
        children: i18n.t('inbox.request'),
      };
    case transitionName.TRANSITION_REQUEST_AFTER_ENQUIRY:
      return {
        orange: true,
        children: i18n.t('inbox.request'),
      };
    case transitionStatuses.ACCEPT:
      return {
        green: true,
        children: i18n.t('inbox.accepted'),
      };
    case transitionStatuses.COMPLETE:
      return {
        green: true,
        children: i18n.t('inbox.delivered'),
      };
    case transitionStatuses.DECLINE:
      return {
        red: true,
        children: i18n.t('inbox.decline'),
      };
    default:
      return {};
  }
};

function Message({ transaction }) {
  const isEnquire =
    R.pathOr('', ['lastTransition'], transaction) ===
    transitionStatuses.ENQUIRE;
  const createdTime = getHourAndMinutes(
    transaction.lastTransitionedAt,
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
  const totalAmount = R.pathOr(
    '',
    ['payinTotal', 'amount'],
    transaction,
  );
  return (
    <ShadowContainer>
      <Touchable
        style={s.container}
        onPress={() =>
          NavigationService.navigateTo('Chat', {
            transaction,
            rentPeriod,
          })
        }
      >
        <View style={s.photoContainer}>
          <Image
            source={{
              uri: R.pathOr(messageImage, ['imageUrl'], transaction),
            }}
            style={s.image}
          />
          <View style={s.requestContainer}>
            <Text
              style={s.request}
              bold
              xxsmallSize
              {...getRentProps(transaction.lastTransition)}
            />
          </View>
        </View>
        <View style={s.messageMainInfo}>
          <View style={s.headerMessage}>
            <Text bold>
              {R.pathOr(
                '',
                [
                  'relationships',
                  'listing',
                  'relationships',
                  'author',
                  'profile',
                  'displayName',
                ],
                transaction,
              )}
            </Text>
            <Text lightGray xsmallSize>
              {createdTime}
            </Text>
          </View>
          <View style={[s.text, isEnquire && s.chat]}>
            <Text
              ellipsizeMode="tail"
              mediumSize
              numberOfLines={1}
              gray
            >
              {R.pathOr(
                '',
                ['relationships', 'listing', 'description'],
                transaction,
              )}
            </Text>
          </View>
          {!isEnquire && (
            <View style={s.rentInfo}>
              <Text xxsmallSize>
                {`${rentPeriod.rangeDate}, $${totalAmount}`}
              </Text>
            </View>
          )}
        </View>
      </Touchable>
    </ShadowContainer>
  );
}

Message.propTypes = {
  transaction: T.object,
};

export default observer(Message);
