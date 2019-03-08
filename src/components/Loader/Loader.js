import React from 'react';
import { ActivityIndicator } from 'react-native';
import T from 'prop-types';
import { colors } from '../../styles';

const Loader = ({ color, large }) => (
  <ActivityIndicator
    size={large && 'large'}
    color={color || colors.loader.primary}
  />
);

Loader.propTypes = {
  color: T.any,
  large: T.bool,
};

export default Loader;
