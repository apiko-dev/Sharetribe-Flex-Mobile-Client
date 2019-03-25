import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, IconFonts } from '..';
import T from 'prop-types';
import s from './styles';
import { colors } from '../../styles';

const TextPicker = ({
  children,
  alignCenter,
  onPress,
  textStyle,
  iconNameLeft,
  iconNameRight,
  iconSize,
  iconTintColor,
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[s.container, alignCenter && s.alignCenter]}
  >
    {iconNameLeft && (
      <IconFonts
        name={iconNameLeft}
        size={iconSize || 20}
        tintColor={iconTintColor || colors.textPicker.icon}
      />
    )}
    <Text style={[s.text, textStyle]} {...props}>
      {children}
    </Text>
    {iconNameRight && (
      <IconFonts
        name={iconNameRight}
        size={iconSize || 20}
        tintColor={iconTintColor || colors.textPicker.icon}
      />
    )}
  </TouchableOpacity>
);

TextPicker.propTypes = {
  smallFontSize: T.bool,
  boldFontWeight: T.bool,
  children: T.any,
  alignCenter: T.bool,
  onPress: T.func,
  textStyle: T.any,
  iconNameLeft: T.string,
  iconNameRight: T.string,
  iconSize: T.number,
  iconTintColor: T.string,
};

export default TextPicker;
