import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';
import { Text } from '../../components';

const ProductScreen = ({ id }) => (
  <View style={s.container}>
    <Text>{id}</Text>
  </View>
);

ProductScreen.navigationOptions = () => ({
  title: 'Product name',
});

ProductScreen.propTypes = {
  id: T.string,
};

export default ProductScreen;
