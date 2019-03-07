import React from 'react';
import { ActivityIndicator } from 'react-native';
import T from 'prop-types';
import { colors } from '../../styles';

const Loader = ({ primary, large }) => (
  <ActivityIndicator
    size={large && 'large'}
    color={primary ? colors.loader.primary : colors.loader.secondary}
  />
);

Loader.propTypes = {
  primary: T.bool,
  large: T.bool,
};

export default Loader;
