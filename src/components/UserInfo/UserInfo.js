import React from 'react';
import T from 'prop-types';
import { View, Image, ImageBackground } from 'react-native';
import R from 'ramda';

import { NavigationService } from '../../services';
import s from './styles';
import {
  Touchable,
  Text,
  Rating,
  ShadowContainer,
  TextTouchable,
  Avatar,
} from '..';
import i18n from '../../i18n';

const UserInfo = ({
  rating,
  user,
  showViewProfile = false,
  textReview = false,
  showAverageRating = false,
  styleContainer,
}) => {
  return (
    <ShadowContainer>
      <View style={[s.container, styleContainer]}>
        <View style={s.mainContainer}>
          <View style={s.avatarContainer}>
            <Avatar user={user} />
          </View>
          <View style={s.infoContainer}>
            <View style={s.name}>
              <Text medium>{user.profile.displayName}</Text>
            </View>
            <Rating
              value={rating}
              showAverageRating={showAverageRating}
            />
          </View>
        </View>
        {showViewProfile && (
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
        )}
        {textReview && (
          <View style={s.reviewTextContainer}>
            <Text>{textReview}</Text>
          </View>
        )}
      </View>
    </ShadowContainer>
  );
};

UserInfo.propTypes = {
  showViewProfile: T.bool,
  showAverageRating: T.bool,
  rating: T.number,
  user: T.object,
  styleContainer: T.any,
};

export default UserInfo;
