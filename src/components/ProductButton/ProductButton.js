import React from 'react';
import { View, Image } from 'react-native';
import T from 'prop-types';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';
import s from './styles';
import i18n from '../../i18n';

const ProductButton = ({ onPress, title, price, uri }) => (
  <View style={s.container}>
    <Touchable onPress={onPress}>
      <View>
        <View style={s.imageContainer}>
          <Image
            source={{
              uri,
            }}
            style={s.image}
          />
        </View>
        <View style={s.infoContainer}>
          <Text numberOfLines={1}>{title}</Text>
          <View style={s.price}>
            <Text xmediumSize bold black>
              {`$ ${price}`}
            </Text>
            <Text xxsmallSize gray>
              {`/${i18n.t('home.day')}`}
            </Text>
          </View>
        </View>
      </View>
    </Touchable>
  </View>
);

ProductButton.propTypes = {
  onPress: T.func,
  title: T.string,
  price: T.number,
  uri: T.string,
};

export default ProductButton;
