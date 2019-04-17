import React from 'react';
import T from 'prop-types';
import { View, Image } from 'react-native';

// import Touchable from '../Touchable';
import Text from '../Text/Text';
import s from './styles';

const messageImage = require('../../assets/png/message_image.png');

const RentItem = () => (
  <View style={s.container}>
    <View style={s.image}>
      <Image style={s.image} source={messageImage} />
    </View>
    <View style={s.textContainer}>
      <View>
        <Text ellipsizeMode="tail" numberOfLines={1} gray>
          Pioneer XDJ-RX2 All-in-One Pioneer XDJ-RX2 All-in-One
          Pioneer XDJ-RX2 All-in-One
        </Text>
      </View>
      <View style={s.dateContainer}>
        <Text xxsmallSize gray>
          Date:{' '}
        </Text>
        <Text xxsmallSize bold>
          08/12/2018 — 09/12/2018
        </Text>
      </View>
      <View style={s.totalPriceContainer}>
        <Text xxsmallSize gray>
          Total price:
        </Text>
        <Text xxsmallSize bold>
          $56
        </Text>
      </View>
    </View>
  </View>
);

RentItem.propTypes = {};

export default RentItem;
