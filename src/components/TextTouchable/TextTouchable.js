import React from 'react';
import { TouchableOpacity, ViewPropTypes } from 'react-native';
import { Text } from '..';
import T from 'prop-types';
import s from './styles';

const TextTouchable = ({
  children,
  alignCenter,
  onPress,
  textStyle,
  containerStyle,
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      s.container,
      alignCenter && s.alignCenter,
      containerStyle,
    ]}
    hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
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
  textStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
};

export default TextTouchable;
