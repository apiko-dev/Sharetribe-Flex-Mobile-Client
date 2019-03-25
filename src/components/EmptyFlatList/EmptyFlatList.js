import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import Text from '../Text/Text';
import IconFonts from '../IconFonts/IconFonts';
import s from './styles';

const EmptyFlatList = ({
  message,
  iconName,
  iconSize,
  iconColor,
}) => (
  <View style={s.container}>
    <IconFonts
      name={iconName}
      iconSize={iconSize || 40}
      tintColor={iconColor}
    />
    <Text gray xxmediumSize style={s.text}>
      {message}
    </Text>
  </View>
);

EmptyFlatList.propTypes = {
  message: T.string,
  iconName: T.string,
  iconSize: T.number,
  iconColor: T.string,
};

export default EmptyFlatList;
