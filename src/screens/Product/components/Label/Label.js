import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import T from 'prop-types';
import s from './styles';

import { Text } from '../../../../components';

function Label({ text, title, onPress }) {
  return (
    <View onPress={onPress} style={s.container}>
      <Text numberOfLines={1}>
        <Text medium gray light style={s.title}>
          {`${title}: `}
        </Text>
        <Text
          medium
          black
          light
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {text}
        </Text>
      </Text>
    </View>
  );
}

function Row({ children, style }) {
  return <View style={[s.containerRow, style]}>{children}</View>;
}

Label.Row = Row;

Label.propTypes = {
  text: T.string,
  title: T.string,
  onPress: T.func,
};

Row.propTypes = {
  style: ViewPropTypes.style,
  children: T.any,
};

export default Label;
