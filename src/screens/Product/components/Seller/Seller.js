import React from 'react';
import T from 'prop-types';
import { View, Image } from 'react-native';
import s from './styles';
import { Touchable, Text, Rating } from '../../../../components';
import i18n from '../../../../i18n';

const Seller = ({ image, name, rating }) => (
  <View style={s.component}>
    <View style={s.avatarContainer}>
      <Image style={s.avatar} source={{ uri: image }} />
    </View>
    <View style={s.infoContainer}>
      <Text>{name}</Text>
    </View>
    <Rating value={rating} />
    <Touchable>
      <Text>{i18n.t('common.viewProfile')}</Text>
    </Touchable>
  </View>
);

Seller.propTypes = {};

export default Seller;
