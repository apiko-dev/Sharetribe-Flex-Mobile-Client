import React from 'react';
import { View, TouchableOpacity, ViewPropTypes } from 'react-native';
import { Text, IconFonts } from '..';
import T from 'prop-types';
import s from './styles';

const Button = ({
  containerStyle,
  disabled,
  onPress,
  isLoading,
  value,
  label,
  ...props
}) => (
  <View style={containerStyle}>
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      {...props}
    >
      <View style={[s.button, s.view, disabled && s.disable]}>
        <Text
          style={[value && s.labelOnTop]}
          mediumSize={!value}
          xsmallSize={value}
          gray
        >
          {label}
        </Text>
        {!!value && (
          <Text mediumSize black>
            {value}
          </Text>
        )}
        <IconFonts
          size={20}
          name="outline-keyboard_arrow_left-24px"
        />
      </View>
    </TouchableOpacity>
  </View>
);

Button.propTypes = {
  containerStyle: ViewPropTypes.style,
  disabled: T.bool,
  onPress: T.func,
  isLoading: T.bool,
  value: T.string,
  label: T.string,
};

export default Button;
