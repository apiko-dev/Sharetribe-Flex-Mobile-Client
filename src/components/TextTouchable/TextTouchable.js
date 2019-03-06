import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '..';
import T from 'prop-types';
import s from './styles';

const TextTouchable = ({
  children,
  alignCenter,
  onPress,
  textStyle,
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[s.container, alignCenter && s.alignCenter]}
  >
    <Text style={[s.text, textStyle]} orange {...props}>
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
  textStyle: T.any,
};

export default TextTouchable;
