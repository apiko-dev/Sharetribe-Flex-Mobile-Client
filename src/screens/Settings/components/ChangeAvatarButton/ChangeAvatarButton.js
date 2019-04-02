import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { Touchable, Text, IconFonts } from '../../../../components';
import s from './styles';
import { colors } from '../../../../styles';
import i18n from '../../../../i18n';

const ChangeAvatarButton = ({ onPress, ...props }) => (
  <Touchable
    useForeground
    rippleColor={colors.button.rippleColor}
    onPress={onPress}
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
);

ChangeAvatarButton.propTypes = {
  onPress: T.func,
};

export default ChangeAvatarButton;
