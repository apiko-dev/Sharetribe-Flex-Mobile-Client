import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { Touchable, Text, IconFonts } from '../../../../components';
import s from './styles';
import i18n from '../../../../i18n';

const Button = ({
  children,
  primary,
  containerStyle,
  disabled,
  onPress,
  isLoading,
  title,
  ...props
}) => (
  <View style={[s.container, containerStyle]}>
    <Touchable
      useForeground
      disabled={disabled}
      onPress={onPress}
      {...props}
    >
      <View style={s.button}>
        <IconFonts name="outline-add_a_photo-24px" size={46} />
        <Text gray xsmallSize>
          {i18n.t('addNewItem.addPhoto')}
        </Text>
      </View>
    </Touchable>
  </View>
);

Button.propTypes = {
  children: T.any,
  primary: T.bool,
  containerStyle: T.any,
  disabled: T.bool,
  onPress: T.func,
  isLoading: T.bool,
  title: T.string,
};

export default Button;
