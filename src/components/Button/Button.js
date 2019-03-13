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
  disabled,
  onPress,
  isLoading,
  title,
  ...props
}) => (
  <View style={containerStyle}>
    <Touchable
      useForeground
      disabled={disabled}
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
          disabled && s.disable,
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
            {title}
          </Text>
        ) : (
          <Loader color={!primary && colors.loader.secondary} />
        )}
      </View>
    </Touchable>
  </View>
);

Button.propTypes = {
  children: T.any,
  primary: T.bool,
  containerStyle: T.any,
  disabled: T.bool,
  onPress: T.func,
  isLoading: T.bool,
  title: T.string,
};

export default Button;
