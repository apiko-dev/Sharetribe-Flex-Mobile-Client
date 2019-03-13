import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { Text } from '../../../../components';
import s from './styles';

const CategorySectionHeader = ({ title }) => (
  <View style={s.header}>
    <Text xmediumSize>{title}</Text>
  </View>
);

CategorySectionHeader.propTypes = {
  title: T.string,
};

export default CategorySectionHeader;
