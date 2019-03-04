import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import T from 'prop-types';
import s from './styles';

const TextTouchable = ({
  children,
  smallFontSize,
  boldFontWeight,
  alignCenter,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[s.container, alignCenter && s.alignCenter]}
  >
    <Text
      style={[
        s.text,
        smallFontSize && s.smallFontSize,
        boldFontWeight && s.boldFontWeight,
      ]}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

TextTouchable.propTypes = {
  smallFontSize: T.bool,
  boldFontWeight: T.bool,
  children: T.any,
  alignCenter: T.bool,
  onPress: T.func,
};

export default TextTouchable;
