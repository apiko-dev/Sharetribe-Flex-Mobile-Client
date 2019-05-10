import React from 'react';
import T from 'prop-types';
import { View, Image } from 'react-native';

import s from './styles';
import {
  Text,
  Touchable,
  ShadowContainer,
} from '../../../../components';
import { NavigationService } from '../../../../services';
import i18n from '../../../../i18n';

const messageImage = require('../../../../assets/png/message_image.png');

const Message = () => (
  <ShadowContainer>
    <Touchable
      style={s.container}
      onPress={() => NavigationService.navigateTo('Chat')}
    >
      <View style={s.photoContainer}>
        <Image source={messageImage} style={s.image} />
        <View style={s.requestContainer}>
          <Text orange style={s.request} bold xxsmallSize>
            {i18n.t('inbox.request')}
          </Text>
          {/* <Text green style={s.request} bold xxsmallSize>
            {i18n.t('inbox.accepted')}
          </Text> */}
        </View>
      </View>
      <View style={s.messageMainInfo}>
        <View style={s.headerMessage}>
          <Text bold>Ola Kori</Text>
          <Text lightGray xsmallSize>
            10:23
          </Text>
        </View>
        <View style={s.text}>
          <Text ellipsizeMode="tail" numberOfLines={1} gray>
            Pioneer XDJ-RX2 All-in-One Pioneer XDJ-RX2 All-in-One
            Pioneer XDJ-RX2 All-in-One
          </Text>
        </View>
        <View style={s.rentInfo}>
          <Text xxsmallSize>08/12/2018 — 09/12/2018</Text>
        </View>
      </View>
    </Touchable>
  </ShadowContainer>
);

Message.propTypes = {};

export default Message;
