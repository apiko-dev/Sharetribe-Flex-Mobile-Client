import React from 'react';
import { View, ViewPropTypes } from 'react-native';
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
  buttonStyle,
  ...props
}) => (
  <View style={[s.container, containerStyle]}>
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
          buttonStyle,
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
  buttonStyle: ViewPropTypes.style,
  children: T.any,
  primary: T.bool,
  containerStyle: ViewPropTypes.style,
  disabled: T.bool,
  onPress: T.func,
  isLoading: T.bool,
  title: T.string,
};

export default Button;
