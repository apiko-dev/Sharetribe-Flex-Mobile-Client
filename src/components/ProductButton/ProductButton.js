import React from 'react';
import { View, Image } from 'react-native';
import T from 'prop-types';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';
import s from './styles';
import i18n from '../../i18n';
import { colors } from '../../styles';
import { formatPrice } from '../../utils';

const ProductButton = ({
  onPress,
  title,
  price,
  src,
  forTwoColumns,
}) => (
  <View style={s.container}>
    <View style={s.containerTouchable}>
      <Touchable
        useForeground
        onPress={onPress}
        rippleColor={colors.productButton.rippleColor}
      >
        <View
          style={[
            s.containerContent,
            forTwoColumns && s.buttonByWindowWidth,
          ]}
        >
          <View style={s.imageContainer}>
            <Image
              source={typeof src === 'string' ? { uri: src } : src}
              style={[s.image, forTwoColumns && s.imageByWindowWidth]}
            />
          </View>
          <View style={s.infoContainer}>
            <Text numberOfLines={1}>{title}</Text>
            <View style={s.price}>
              <Text xmediumSize bold black>
                {`$ ${formatPrice(price)}`}
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
  forTwoColumns: T.bool,
};

export default ProductButton;
