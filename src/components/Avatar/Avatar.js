import React from 'react';
import { View, ImageBackground } from 'react-native';
import T from 'prop-types';
import { observer } from 'mobx-react';
import R from 'ramda';
import { compose, withProps } from 'recompose';
import IconAppLogo from '../../assets/png/icon-app-logo.png';
import s from './styles';
import { colors } from '../../styles';
import Touchable from '../Touchable/Touchable';
import Text from '../Text/Text';
import IconFonts from '../IconFonts/IconFonts';
import i18n from '../../i18n';
import Loader from '../Loader/Loader';
import { createAvatar } from '../../utils';

const Avatar = ({
  user,
  large,
  small,
  canChange,
  onPressChange,
  isLoading,
  avatarPlaceholder,
  avatarSrc,
  ...props
}) => (
  <View>
    <ImageBackground
      source={
        avatarSrc
          ? {
              uri: avatarSrc,
            }
          : IconAppLogo
      }
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
      {!!user && !avatarSrc && (
        <View
          style={[
            s.avatarPlaceholderContainer,
            { backgroundColor: avatarPlaceholder.color },
            s.logoImageBackground,
            s.logoImageBackgroundMedium,
            small && s.logoImageBackgroundSmall,
            large && s.logoImageBackgroundLarge,
          ]}
        >
          <Text xlargeSize white>
            {avatarPlaceholder.abbreviatedName}
          </Text>
        </View>
      )}
      {canChange && (
        <View style={s.wrapper}>
          <Touchable
            useForeground
            rippleColor={colors.button.rippleColor}
            onPress={onPressChange}
            {...props}
            style={s.container}
          >
            <View style={[s.button, s.view]}>
              {isLoading ? (
                <Loader />
              ) : (
                <React.Fragment>
                  <IconFonts name="edit" size={15} />
                  <Text style={s.text} bold gray xxsmallSize>
                    {i18n.t('settings.change')}
                  </Text>
                </React.Fragment>
              )}
            </View>
          </Touchable>
        </View>
      )}
    </ImageBackground>
  </View>
);

Avatar.propTypes = {
  user: T.object,
  large: T.bool,
  small: T.bool,
  canChange: T.bool,
  isLoading: T.bool,
  onPressChange: T.func,
  avatarPlaceholder: T.any,
  avatarSrc: T.any,
};

export default compose(
  withProps(({ user }) => {
    const avatarPlaceholder =
      !!user &&
      createAvatar({
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        abbreviatedName: user.profile.abbreviatedName,
        colorsArray: colors.avatars,
      });

    const avatarSrc = R.pathOr(
      false,
      ['relationships', 'profileImage', 'variants', 'default', 'url'],
      user,
    );

    return {
      avatarPlaceholder,
      avatarSrc,
    };
  }),
  observer,
)(Avatar);
