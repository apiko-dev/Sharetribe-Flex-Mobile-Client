import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';
import s from './styles';

const ShadowContainer = ({ children, style, containerStyle }) => (
  <View style={[s.innerContainer, containerStyle]}>
    <View style={[s.container, style]}>{children}</View>
  </View>
);

ShadowContainer.propTypes = {};

export default ShadowContainer;
