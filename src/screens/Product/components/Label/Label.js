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
      <Text>{title}: </Text>
      <Text>{text}</Text>
    </Touchable>
  );
}

function Row({ children, style }) {
  return <View style={[s.containerRow, style]}>{children}</View>;
}

Label.Row = Row;

export default Label;
