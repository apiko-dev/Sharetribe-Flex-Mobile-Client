import React from 'react';
import { View, Text } from 'react-native';
import { Touchable } from '..';
import T from 'prop-types';
import s from './styles';

const Button = ({ children, primary }) => (
  <Touchable>
    <View style={[s.button, s.view, primary && s.primaryView]}>
      <Text style={[s.text, primary && s.primaryText]}>
        {children}
      </Text>
    </View>
  </Touchable>
);

Button.propTypes = {
  children: T.any,
  primary: T.bool,
};

export default Button;
