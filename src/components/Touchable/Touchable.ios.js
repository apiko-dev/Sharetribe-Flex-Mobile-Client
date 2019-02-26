import React from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

const Touchable = ({ children, useHighlight, ...props }) => {
  if (useHighlight) {
    return (
      <TouchableHighlight {...props}>
        {children}
      </TouchableHighlight>
    );
  }

  return (
    <TouchableOpacity {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default Touchable;