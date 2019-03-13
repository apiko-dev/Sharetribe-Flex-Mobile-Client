import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import T from 'prop-types';
import { Text, IconFonts } from '../../../../components';
import s from './styles';

const CategoryItem = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={s.item}>
      <IconFonts
        name="outline-keyboard_arrow_left-24px-1"
        size={20}
      />
      <Text style={s.text}>{title}</Text>
    </View>
  </TouchableOpacity>
);

CategoryItem.propTypes = {
  title: T.string,
  onPress: T.func,
};

export default CategoryItem;
