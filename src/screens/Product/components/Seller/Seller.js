import React from 'react';
import T from 'prop-types';
import { View, Image } from 'react-native';
import s from './styles';
import { Touchable, Text, Rating } from '../../../../components';
import i18n from '../../../../i18n';

const Seller = ({ image, name, rating }) => (
  <Touchable style={s.container}>
    <View style={s.mainContainer}>
      <View style={s.avatarContainer}>
        <Image style={s.avatar} source={{ uri: image }} />
      </View>
      <View style={s.infoContainer}>
        <View style={s.name}>
          <Text>{name}</Text>
        </View>
        <Rating value={rating} />
      </View>
    </View>
    <Touchable style={s.button}>
      <Text orange>{i18n.t('common.viewProfile')}</Text>
    </Touchable>
  </Touchable>
);

Seller.propTypes = {};

export default Seller;
