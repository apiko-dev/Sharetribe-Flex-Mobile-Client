import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import T from 'prop-types';
import IconAppLogo from '../../assets/png/icon-app-logo.png';
import s from './styles';

const Avatar = ({ user, large, small }) => (
  <View>
    <ImageBackground
      source={IconAppLogo}
      style={[
        s.logoImageBackground,
        s.logoImageBackgroundMedium,
        small && s.logoImageBackgroundSmall,
        large && s.logoImageBackgroundLarge,
      ]}
      imageStyle={[
        s.logoBackground,
        s.logoBackgroundMedium,
        small && s.logoBackgroundSmall,
        large && s.logoBackgroundLarge,
      ]}
    >
      {user && user.image && <Image source={user.image} />}
    </ImageBackground>
  </View>
);

Avatar.propTypes = {
  user: T.object,
  large: T.bool,
  small: T.bool,
};

export default Avatar;
