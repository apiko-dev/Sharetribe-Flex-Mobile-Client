import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';
import i18n from '../../../../i18n';
import { categories } from '../../../../constants';
import { Text, Touchable } from '../../../../components';

function Label({ text, title, onPress }) {
  return (
    <Touchable onPress={onPress} style={s.container}>
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
    </Touchable>
  );
}

function Row({ children, style }) {
  return <View style={[s.containerRow, style]}>{children}</View>;
}

Label.Row = Row;

export default Label;
