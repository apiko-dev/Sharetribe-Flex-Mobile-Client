import React from 'react';
import { TouchableOpacity, TouchableHighlight } from 'react-native';
import T from 'prop-types';

const Touchable = ({ children, useHighlight, ...props }) => {
  if (useHighlight) {
    return (
      <TouchableHighlight {...props}>{children}</TouchableHighlight>
    );
  }

  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
};

Touchable.propTypes = {
  children: T.any,
  useHighlight: T.bool,
};

export default Touchable;
