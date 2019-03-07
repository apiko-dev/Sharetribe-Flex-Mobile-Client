import React from 'react';
import { View } from 'react-native';
import { Touchable, Text } from '..';
import T from 'prop-types';
import s from './styles';
import { colors } from '../../styles';
import Loader from '../Loader/Loader';

const Button = ({
  children,
  primary,
  containerStyle,
  disable,
  onPress,
  isLoading,
  ...props
}) => (
  <View style={containerStyle}>
    <Touchable
      useForeground
      disabled={disable || isLoading}
      rippleColor={
        primary
          ? colors.button.rippleColorPrimary
          : colors.button.rippleColor
      }
      onPress={onPress}
      {...props}
    >
      <View
        style={[
          s.button,
          s.view,
          primary && s.primaryView,
          disable && s.disable,
          isLoading && s.disable,
        ]}
      >
        {!isLoading ? (
          <Text
            style={s.text}
            bold
            mediumSize
            white={primary}
            gray={!primary}
          >
            {children}
          </Text>
        ) : (
          <Loader primary />
        )}
      </View>
    </Touchable>
  </View>
);

Button.propTypes = {
  children: T.any,
  primary: T.bool,
  containerStyle: T.any,
  disable: T.bool,
  onPress: T.func,
  isLoading: T.bool,
};

export default Button;
