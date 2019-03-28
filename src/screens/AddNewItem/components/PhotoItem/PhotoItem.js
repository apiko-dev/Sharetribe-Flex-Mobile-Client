import React from 'react';
import { View, ViewPropTypes, Image } from 'react-native';
import T from 'prop-types';
import { IconFonts } from '../../../../components';
import s from './styles';

const PhotoItem = ({ src, containerStyle, onPress, ...props }) => (
  <View style={[s.container, containerStyle]}>
    <View style={s.removeIconContainer}>
      <IconFonts
        name="close"
        size={19}
        onPress={onPress}
        {...props}
      />
    </View>
    <View style={s.item}>
      <Image
        source={{ uri: src }}
        style={s.image}
        resizeMode="cover"
      />
    </View>
  </View>
);

PhotoItem.propTypes = {
  containerStyle: ViewPropTypes.style,
  onPress: T.func,
  src: T.string,
};

export default PhotoItem;
