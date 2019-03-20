import React from 'react';
import { View, Image } from 'react-native';
import T from 'prop-types';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';
import s from './styles';
import i18n from '../../i18n';

const ProductButton = ({
  onPress,
  title,
  status,
  statusTitle,
  price,
  uri,
}) => (
  <View style={s.container}>
    <Touchable onPress={onPress}>
      <View>
        <View style={s.imageContainer}>
          <Image
            source={{
              uri:
                'https://img.tsn.ua/cached/1533903433/tsn-b25e6f1976038590cc026f4c4c2e9979/thumbs/1340x530/4f/47/283f9ec3e7479a9bcad790140189474f.jpeg',
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
  status: T.bool,
  statusTitle: T.string,
  price: T.string,
  uri: T.string,
};

export default ProductButton;
