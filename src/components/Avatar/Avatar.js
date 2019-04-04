import React from 'react';
import { View, ImageBackground } from 'react-native';
import T from 'prop-types';
import { observer } from 'mobx-react';
import IconAppLogo from '../../assets/png/icon-app-logo.png';
import s from './styles';
import { colors } from '../../styles';
import Touchable from '../Touchable/Touchable';
import Text from '../Text/Text';
import IconFonts from '../IconFonts/IconFonts';
import i18n from '../../i18n';

const Avatar = ({
  user,
  large,
  small,
  canChange,
  onPressChange,
  ...props
}) => (
  <View>
    <ImageBackground
      source={
        user && user.relationships && user.relationships.profileImage
          ? {
              uri:
                user.relationships.profileImage.variants.default.url,
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
              <IconFonts name="edit" size={15} />
              <Text style={s.text} bold gray xxsmallSize>
                {i18n.t('settings.change')}
              </Text>
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
  onPressChange: T.func,
};

export default observer(Avatar);
