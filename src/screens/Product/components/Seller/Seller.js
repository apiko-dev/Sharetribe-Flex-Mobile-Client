import React from 'react';
import T from 'prop-types';
import { View, Image, ImageBackground } from 'react-native';
import R from 'ramda';

import { NavigationService } from '../../../../services';
import s from './styles';
import {
  Touchable,
  Text,
  Rating,
  ShadowContainer,
  TextTouchable,
  Avatar,
} from '../../../../components';
import i18n from '../../../../i18n';

const Seller = ({ image, rating, user }) => {
  return (
    <ShadowContainer>
      <View style={s.container}>
        <View style={s.mainContainer}>
          <View style={s.avatarContainer}>
            <Avatar user={user} />
          </View>
          <View style={s.infoContainer}>
            <View style={s.name}>
              <Text medium>{user.profile.displayName}</Text>
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
};

Seller.propTypes = {
  image: T.string,
  rating: T.number,
  user: T.object,
};

export default Seller;
