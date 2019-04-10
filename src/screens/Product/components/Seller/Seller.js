import React from 'react';
import T from 'prop-types';
import { View, Image, ImageBackground } from 'react-native';

import { NavigationService } from '../../../../services';
import s from './styles';
import {
  Touchable,
  Text,
  Rating,
  ShadowContainer,
  TextTouchable,
} from '../../../../components';
import i18n from '../../../../i18n';

const placeholderImage = require('../../../../assets/png/icon-app-logo.png');

const Seller = ({ image, rating, user }) => (
  <ShadowContainer>
    <View style={s.container}>
      <View style={s.mainContainer}>
        <View style={s.avatarContainer}>
          <ImageBackground
            source={placeholderImage}
            style={s.avatarBackgroundImage}
          >
            <Image style={s.avatar} source={{ uri: image }} />
          </ImageBackground>
        </View>
        <View style={s.infoContainer}>
          <View style={s.name}>
            <Text medium>{user.displayName}</Text>
          </View>
          <Rating value={rating} />
        </View>
      </View>
      <Touchable style={s.button}>
        <TextTouchable
          onPress={() =>
            NavigationService.navigateToProfile({
              user,
            })
          }
          containerStyle={s.viewProfileButton}
          textStyle={s.viewProfileButtonText}
        >
          {i18n.t('common.viewProfile')}
        </TextTouchable>
      </Touchable>
    </View>
  </ShadowContainer>
);

Seller.propTypes = {
  image: T.string,
  rating: T.number,
  user: T.object,
};

export default Seller;
