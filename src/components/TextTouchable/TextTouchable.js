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
    hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
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
  containerStyle: ViewPropTypes.style,
};

export default TextTouchable;
