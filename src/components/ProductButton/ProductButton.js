import React from 'react';
import { View, Image } from 'react-native';
import T from 'prop-types';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';
import s from './styles';
import i18n from '../../i18n';
import { colors } from '../../styles';

const ProductButton = ({ onPress, title, price, src }) => (
  <View style={s.container}>
    <View style={s.containerTouchable}>
      <Touchable
        useForeground
        onPress={onPress}
        rippleColor={colors.productButton.rippleColor}
      >
        <View style={s.containerContent}>
          <View style={s.imageContainer}>
            <Image
              source={typeof src === 'string' ? { uri: src } : src}
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
  </View>
);

ProductButton.propTypes = {
  onPress: T.func,
  title: T.string,
  price: T.number,
  src: T.any,
};

export default ProductButton;
