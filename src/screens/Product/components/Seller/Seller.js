import React from 'react';
import T from 'prop-types';
import { View, Image, ImageBackground } from 'react-native';
import s from './styles';
import {
  Touchable,
  Text,
  Rating,
  ShadowContainer,
} from '../../../../components';
import i18n from '../../../../i18n';

const placeholderImage = require('../../../../assets/png/icon-app-logo.png');

const Seller = ({ image, name, rating }) => (
  <ShadowContainer>
    <Touchable style={s.container}>
      <View style={s.mainContainer}>
        <View style={s.avatarContainer}>
          <ImageBackground
            source={placeholderImage}
            style={s.carouselBackgroundImage}
          >
            <Image style={s.avatar} source={{ uri: image }} />
          </ImageBackground>
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
  </ShadowContainer>
);

Seller.propTypes = {};

export default Seller;
