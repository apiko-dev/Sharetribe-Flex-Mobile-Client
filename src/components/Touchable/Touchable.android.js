import React from 'react';
import {
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';

const Touchable = ({
  style,
  children,
  rippleColor = '#fff',
  backgroundType,
  borderless = false,
  useForeground = false,
  ...props
}) => {
  if (Platform.Version <= 20) {
    return (
      <TouchableOpacity {...props} style={style}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableNativeFeedback
      {...props}
      useForeground={Platform.Version >= 23 && useForeground}
      delayPressIn={0}
      background={backgroundType
        ? TouchableNativeFeedback.Ripple[backgroundType]()
        : TouchableNativeFeedback.Ripple(rippleColor, borderless)
      }
    >
      <View style={style}>
        {children}
      </View>
    </TouchableNativeFeedback>
  );
};

export default Touchable;